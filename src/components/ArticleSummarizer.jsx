import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import ReactMarkdown from "react-markdown";
import { DeleteIcon } from "../constants/icons";

const ArticleSummarizer = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [isReSummarizing, setIsReSummarizing] = useState(false);

  const [getSummary, { error: summaryError, isFetching }] =
    useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e, forceNew = false) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );
    if (existingArticle && !forceNew) {
      setArticle(existingArticle);
      return;
    }

    const { data } = await getSummary({ articleUrl: article.url });

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

  const handleReSummarize = (e) => {
    setIsReSummarizing(true);
    handleSubmit(e, true);
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
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
    }
  };

  const handleArticleClick = (item) => {
    setArticle(item);
    setIsReSummarizing(false);
  };

  const handleDelete = (urlToDelete) => {
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

  return (
    <section className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 w-full max-w-xl mx-auto px-2 sm:px-3 md:px-4">
      <div className="flex flex-col w-full gap-1.5">
        <form
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
            className="url_input text-sm sm:text-base pl-7 sm:pl-8 pr-8 sm:pr-10"
          />
          <button type="submit" className="submit_btn">
            <p className="text-sm sm:text-base">↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-24 sm:max-h-32 md:max-h-40 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} className="link_card group">
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
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-4 sm:my-6 md:my-8 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
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
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-2">
                <h2 className="font-satoshi font-bold text-gray-600 text-sm sm:text-base md:text-lg">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                {!isReSummarizing && article.url && (
                  <button
                    onClick={handleReSummarize}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-blue-500 hover:text-blue-700 transition-colors self-start sm:self-auto"
                  >
                    Re-summarize
                  </button>
                )}
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
                    onClick={handleShare}
                    className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    Share Summary
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ArticleSummarizer;
