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
    <section className="mt-16 w-full max-w-xl mx-auto">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => handleArticleClick(item)}
              className="link_card"
            >
              <div
                className="copy_btn"
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
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : summaryError ? (
          <p className="font-inter font-bold text-black text-center">
            Sorry, there was an error processing your request.
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              Please try again later.
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                {!isReSummarizing && article.url && (
                  <button
                    onClick={handleReSummarize}
                    className="px-3 py-1.5 text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Re-summarize
                  </button>
                )}
              </div>
              <div className="summary_box">
                <div className="font-inter font-medium text-sm text-gray-700 prose prose-sm max-w-none">
                  <ReactMarkdown>{article.summary}</ReactMarkdown>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleCopy(article.summary)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <img
                      src={copied === article.summary ? tick : copy}
                      alt="copy icon"
                      className="w-4 h-4"
                    />
                    {copied === article.summary ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
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
