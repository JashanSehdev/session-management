"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { Typography } from "@mui/material";
import GlobalModal from "../ui/global-modal/global-modal";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { setCode } from "@/features/auth/auth.slice";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const sessionCode = useAppSelector((state) => state.auth.sessionCode)
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error.message);
    };

    const handleCode = (code: number) => {

      dispatch(setCode(code))
      console.log("code received:", code);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("sessionCode", handleCode)

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("sessionCode", handleCode)
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}
