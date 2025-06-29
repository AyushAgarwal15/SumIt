import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import ReactMarkdown from "react-markdown";

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

  return (
    <section className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 w-full max-w-xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-2 sm:ml-3 w-3.5 sm:w-4 md:w-5"
          />

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input text-sm sm:text-base md:text-lg pl-6 sm:pl-7 md:pl-8 lg:pl-10 pr-8 sm:pr-10 md:pr-12"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 w-6 sm:w-7 md:w-8 lg:w-10"
          >
            <p className="text-sm sm:text-base md:text-lg">↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-32 sm:max-h-40 md:max-h-48 lg:max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => handleArticleClick(item)}
              className="link_card p-1.5 sm:p-2 md:p-2.5 lg:p-3"
            >
              <div
                className="copy_btn w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
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
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-xs sm:text-sm md:text-base truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-6 sm:my-8 md:my-10 lg:my-12 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
          />
        ) : summaryError ? (
          <p className="font-inter font-bold text-black text-center text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4">
            Sorry, there was an error processing your request.
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              Please try again later.
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-2 lg:gap-0">
                <h2 className="font-satoshi font-bold text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                {!isReSummarizing && article.url && (
                  <button
                    onClick={handleReSummarize}
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base text-blue-500 hover:text-blue-700 transition-colors self-start sm:self-auto"
                  >
                    Re-summarize
                  </button>
                )}
              </div>
              <div className="summary_box p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-6">
                <div className="font-inter font-medium text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed max-w-none">
                  <ReactMarkdown>{article.summary}</ReactMarkdown>
                </div>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => handleCopy(article.summary)}
                    className="px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <img
                      src={copied === article.summary ? tick : copy}
                      alt="copy icon"
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
                    />
                    {copied === article.summary ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
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
