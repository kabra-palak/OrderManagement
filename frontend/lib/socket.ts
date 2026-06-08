import { io } from "socket.io-client";
import { queryClient } from "@/lib/queryClient";

const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const invalidateOrders = () => {
  queryClient.invalidateQueries({ queryKey: ["orders"] });
};

socket.on("connect", () => console.log("Socket connected:", socket.id));
socket.on("disconnect", () => console.log("Socket disconnected"));
socket.on("order:updated", invalidateOrders);
socket.on("order:created", invalidateOrders);

export default socket;