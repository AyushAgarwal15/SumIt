import { useState, useEffect } from "react";
import { copy, linkIcon, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import ReactMarkdown from "react-markdown";
import { DeleteIcon, SpeakerIcon, StopIcon, UploadIcon } from "../constants/icons";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoader from "./common/SkeletonLoader";
import { toast } from "react-toastify";
import { extractTextFromPDF } from "../utils/pdfUtils";
import { useSummarizeTextMutation } from "../services/article";
import { languages } from "../constants/languages";

interface Article {
  url: string;
  summary: string;
}

const ArticleSummarizer = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [articleContent, setArticleContent] = useState<string>(""); // Store original text for re-summarization
  const [copied, setCopied] = useState<string | boolean>("");
  const [isReSummarizing, setIsReSummarizing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");

  const [getSummary, { error: summaryError, isFetching }] =
    useLazyGetSummaryQuery();
  const [summarizeText, { isLoading: isTextSummarizing }] = useSummarizeTextMutation();

  const isBusy = isFetching || isTextSummarizing || isExtracting;

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "null"
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth?.getVoices() || [];
      // Priority list: Google US English > Microsoft Zira > Samantha > First available
      const preferredVoice = availableVoices.find(
        (v) =>
          v.name.includes("Google US English") ||
          v.name.includes("Microsoft Zira") ||
          v.name.includes("Samantha")
      );
      setVoice(preferredVoice || availableVoices[0]);
    };

    if (synth) {
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, [synth]);

  useEffect(() => {
    if (summaryError) {
      toast.error("Failed to fetch summary. Please try again.");
    }
  }, [summaryError]);

  // Auto-summarize when language changes if we have a URL
  // We handle this via handleLanguageChange now
  
  const handleLanguageChange = async (newLang: string) => {
    setLang(newLang);
    
    // If we have original content (from PDF/TXT), use summarizeText
    if (articleContent) {
        const result = await summarizeText({ text: articleContent, lang: newLang });
        if ("data" in result && result.data?.summary) {
            setArticle({ ...article, summary: result.data.summary });
        }
        return;
    }

    // Otherwise, if it's a URL, use getSummary
    if (article.url) {
       // Force re-fetch with new language
       const { data } = await getSummary({ articleUrl: article.url, lang: newLang });
       if (data?.summary) {
         setArticle({ ...article, summary: data.summary });
       }
    }
  };

  const handleSubmit = async (e: React.FormEvent, forceNew: boolean = false) => {
    e.preventDefault();
    
    // Reset article content as we are fetching from URL
    setArticleContent("");

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );
    if (existingArticle && !forceNew) {
      setArticle(existingArticle);
      return;
    }

    const { data } = await getSummary({ articleUrl: article.url, lang });

    if (data?.summary) {
      const newArticle = {
        url: forceNew ? article.url : "",
        summary: data.summary,
      };

      if (!forceNew) {
        const updatedAllArticles = [
          { url: article.url, summary: data.summary },
          ...allArticles,
        ];
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }

      setArticle(newArticle);
      setIsReSummarizing(false);
    }
  };

  const handleReSummarize = (e: React.MouseEvent) => {
    setIsReSummarizing(true);
    // Cast to FormEvent because handleSubmit expects it, though we're calling it from a button click here.
    // Ideally handleSubmit should accept SyntheticEvent or we wrap it.
    // For simplicity calling it as is, but we need to match the signature.
    // Actually handleSubmit calls e.preventDefault(), so we need a compatible event.
    handleSubmit(e as unknown as React.FormEvent, true);
  };

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Article Summary",
          text: article.summary,
          url: window.location.href,
        });
      } else {
        handleCopy(article.summary);
      }
    } catch (err) {
      console.log("Error sharing:", err);
      toast.error("Sharing failed.");
    }
  };

  const handleSpeak = () => {
    if (!article.summary || !synth) return;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(article.summary);
    
    // Set the language for the utterance to match selected language or auto-detect
    if (lang) {
        utterance.lang = lang;
        // Try to find a voice that matches the language
        const languageVoices = synth.getVoices().filter(v => v.lang.startsWith(lang));
        if (languageVoices.length > 0) {
             // Prefer Google or Microsoft voices if available for that language
             const preferred = languageVoices.find(v => v.name.includes("Google") || v.name.includes("Microsoft"));
             utterance.voice = preferred || languageVoices[0];
        }
    } else if (voice) {
       utterance.voice = voice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      // Only show error if it wasn't a manual interruption
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        toast.error("An error occurred while speaking: " + event.error);
      }
    };
    
    synth.cancel(); // Cancel any current speech
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  const handleArticleClick = (item: Article) => {
    setArticle(item);
    setIsReSummarizing(false);
  };

  const handleDelete = (urlToDelete: string) => {
    const updatedArticles = allArticles.filter(
      (item) => item.url !== urlToDelete
    );
    setAllArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));

    // If the currently selected article is being deleted, clear it
    if (article.url === urlToDelete) {
      setArticle({ url: "", summary: "" });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && file.type !== "text/plain") {
      toast.error("Please upload a PDF or TXT file.");
      return;
    }

    setIsExtracting(true);
    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else {
        text = await file.text();
      }

      if (!text.trim()) {
        toast.error("Could not extract text from file.");
        setIsExtracting(false);
        return;
      }

      setArticleContent(text); // Save extracted text

      const result = await summarizeText({ text, lang });
      
      if ("data" in result) {
        const data = result.data;
        if (data?.summary) {
          const newArticle = {
            url: file.name, // Use filename as "url" identifier
            summary: data.summary,
          };
          
          // Add to history
          const updatedAllArticles = [newArticle, ...allArticles];
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          
          setArticle(newArticle);
          setIsReSummarizing(false);
        } else {
             toast.error("Failed to generate summary from file.");
        }
      } else {
        toast.error("Failed to generate summary from file.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing file.");
    } finally {
      setIsExtracting(false);
      // Reset input value
      e.target.value = "";
    }
  };

  return (
    <section className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 w-full max-w-xl mx-auto px-2 sm:px-3 md:px-4">
      <div className="flex flex-col w-full gap-1.5">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-2.5 w-3.5 sm:w-4"
          />

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer text-sm sm:text-base pl-7 sm:pl-8 pr-8 sm:pr-10"
          />
          <button type="submit" className="submit_btn peer-focus:border-black peer-focus:text-black hover:border-black hover:text-black transition-colors">
            <p className="text-sm sm:text-base">↵</p>
          </button>

          {/* Language Selector */}

        </motion.form>



        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center w-full"
        >
          <label className="flex items-center gap-2 cursor-pointer bg-white border border-dashed border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors w-full justify-center group">
             <UploadIcon />
             <span className="text-sm text-gray-500 group-hover:text-gray-700 font-satoshi">
               {isExtracting ? "Extracting..." : "Upload PDF or TXT to Summarize & Translate"}
             </span>
             <input 
               type="file" 
               accept=".pdf,.txt" 
               onChange={handleFileUpload} 
               className="hidden" 
               disabled={isBusy}
             />
          </label>
        </motion.div>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-24 sm:max-h-32 md:max-h-40 overflow-y-auto">
          <AnimatePresence>
            {allArticles.map((item, index) => (
              <motion.div
                key={`link-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
                className="link_card group"
              >
                <div
                  className="flex-1 flex items-center gap-2 cursor-pointer overflow-hidden"
                  onClick={() => handleArticleClick(item)}
                >
                  <div
                    className="copy_btn shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.url);
                    }}
                  >
                    <img
                      src={copied === item.url ? tick : copy}
                      alt={copied === item.url ? "tick_icon" : "copy_icon"}
                      className="w-[40%] h-[40%] object-contain"
                    />
                  </div>
                  <p
                    className="font-satoshi text-blue-700 font-medium text-xs sm:text-sm truncate"
                    title={item.url}
                  >
                    {item.url}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.url);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors px-2 shrink-0 flex items-center"
                  aria-label="Delete article"
                >
                  <DeleteIcon />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Display Result */}
      <div className="my-4 sm:my-6 md:my-8 max-w-full flex justify-center items-center">
        {isBusy ? (
          <div className="w-full max-w-2xl">
            <SkeletonLoader />
          </div>
        ) : summaryError ? (
          <p className="font-inter font-bold text-black text-center text-xs sm:text-sm px-2">
            Sorry, there was an error processing your request.
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              Please try again later.
            </span>
          </p>
        ) : (
          article.summary && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2 w-full"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-2">
                <h2 className="font-satoshi font-bold text-gray-600 text-sm sm:text-base md:text-lg flex items-center gap-2">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                
                <div className="flex items-center gap-2">
                  <select
                    value={lang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md text-gray-700 text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500 block p-1.5 font-medium cursor-pointer hover:bg-gray-50"
                  >
                    {languages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Show Re-summarize button only for URLs (not file uploads) since we auto-translate files */}
                  {!isReSummarizing && !articleContent && article.url && (
                    <button
                      onClick={handleReSummarize}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-blue-500 hover:text-blue-700 transition-colors border border-blue-200 rounded-md hover:bg-blue-50"
                    >
                      Re-summarize
                    </button>
                  )}
                </div>
              </div>
              <div className="summary_box">
                <div className="font-inter font-medium text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <ReactMarkdown>{article.summary}</ReactMarkdown>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                  <button
                    onClick={() => handleCopy(article.summary)}
                    className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <img
                      src={copied === article.summary ? tick : copy}
                      alt="copy icon"
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    />
                    {copied === article.summary ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleSpeak}
                    className={`w-full sm:w-auto px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 ${
                      isSpeaking
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <StopIcon />
                        Stop
                      </>
                    ) : (
                      <>
                        <SpeakerIcon />
                        Listen
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    Share Summary
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default ArticleSummarizer;
