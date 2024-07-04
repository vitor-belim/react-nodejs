import { createContext } from "react";

interface LoadingContextModel {
  isLoading: boolean;
  setIsLoading: (auth: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextModel>({
  isLoading: false,
  setIsLoading: (_bool) => undefined,
});
