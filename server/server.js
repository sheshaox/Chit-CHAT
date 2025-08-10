import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();


// Create Express app and HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users: { userId: socketId }
export const userSocketMap = {};

// Socket.IO connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    console.log("✅ User Connected:", userId);
    userSocketMap[userId] = socket.id;
  } else {
    console.log("⚠️ User Connected: userId not provided in query");
  }

  // Emit updated online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Handle sendMessage from sender and forward to recipient
 socket.on("sendMessage", (message) => {
  const senderSocketId = userSocketMap[message.senderId];
  const receiverSocketId = userSocketMap[message.receiverId];

  if (senderSocketId) {
    io.to(senderSocketId).emit("newmessage", message);
  }

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newmessage", message);
  }
});


  // Handle disconnection
  socket.on("disconnect", () => {
    if (userId) {
      console.log("❌ User Disconnected:", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    } else {
      console.log("⚠️ Disconnected socket had no userId");
    }
  });
});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes
app.get("/api/status", (req, res) => res.send("✅ Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log("🚀 Server is running on PORT:", PORT)
);
