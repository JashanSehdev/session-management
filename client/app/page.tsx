'use client'
import { socket } from "@/lib/socket";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import GlobalModal from "./ui/global-modal/global-modal";
import { useAppSelector } from "@/features/store";

export default function Home() {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState<number | null>()
  const sessionCode = useAppSelector((state) => state.auth.sessionCode)
  useEffect(() => {
    const handleMessage = (code : number) => {
      console.log("session code", code)
      setOpen(true)
    };
    socket.on(`sessionCode`, handleMessage);

    return () => {
      socket.off(`sessionCode`, handleMessage);
    };
  }, []);
  return (
    <Box>
      <GlobalModal openBox={!!sessionCode} code={sessionCode}/>
    </Box>
  );
}
