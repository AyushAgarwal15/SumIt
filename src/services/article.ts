import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "1310c425e7mshcb5c7d89a971ebep1c51c9jsn815318262790"
      );
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query<{ summary: string }, { articleUrl: string }>({
      // encodeURIComponent() function encodes special characters that may be present in the parameter values
      // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
      query: (params) =>
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
    summarizeText: builder.mutation<{ summary: string }, { text: string }>({
      query: (params) => ({
        url: "summarize-text",
        method: "POST",
        body: {
          text: params.text,
          lang: "en", 
        },
      }),
    }),
  }),
});
console.log(rapidApiKey);
export const { useLazyGetSummaryQuery, useSummarizeTextMutation } = articleApi;
