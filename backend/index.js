import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import orderRoutes from "./src/routes/routes.js";
import { initSocket } from "./src/socket.js";
import analyticsRoutes from "./src/routes/analytics.js";
dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/orders", orderRoutes);
app.use("/", analyticsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

initSocket(httpServer);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});