import { SWRConfig } from "swr";
import React from "react";
import fetcher from "@/services/fetcher";

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error) => {
          console.error(error);
        },
        revalidateOnFocus: false,
        refreshInterval: 10000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
