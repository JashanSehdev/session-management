"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import SnackbarProviderWrapper from "./snackbar";
import { ReduxProvider } from "./storage-provider";
import SocketProvider from "./socket-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <AppRouterCacheProvider>
        <SnackbarProviderWrapper>
            <SocketProvider>
            {children}
            </SocketProvider>
        </SnackbarProviderWrapper>
      </AppRouterCacheProvider>
    </ReduxProvider>
  );
};
