import { useEffect } from "react";
import socket from "@/lib/socket";

export const useSocket = (storeId: string) => {
  useEffect(() => {
    if (storeId) {
      socket.emit("join:store", storeId);
    }
  }, [storeId]);

  useEffect(() => {
    socket.on("reconnect", (attempt) => {
      console.log(`Reconnected after ${attempt} attempts`);
      if (storeId) socket.emit("join:store", storeId);
    });

    socket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });

    return () => {
      socket.off("reconnect");
      socket.off("reconnect_failed");
    };
  }, [storeId]);
};