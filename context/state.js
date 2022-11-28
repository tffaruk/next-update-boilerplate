"use client";
import { createContext, useContext } from "react";
import posts from "../.json/posts.json";

const SearchContext = createContext();

export const JsonContext = ({ children }) => {
  const state = {
    posts,
  };

  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  console.log(typeof useContext(SearchContext));
  return useContext(SearchContext);
};
