"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SearchContextState {
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;
}

const searchContext = createContext<SearchContextState | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [search, setSearch] = useState<string | null>(null);
  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(searchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");

  return context;
};
