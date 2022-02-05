// Express
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fileUpload from "express-fileupload";
import messagesRoutes from "./routes/message";
import questionsRoutes from "./routes/question";
//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//
import trim from "./middlewears/trim";

// ────────────────────────────────────────────────────────────────────────────────
dotenv.config(); // allow access to .env file in the root folder

//
// ─── TYPEORM ────────────────────────────────────────────────────────────────────
//

import { createConnection } from "typeorm";

//
// ─── Routes ────────────────────────────────────────────────────────────────
//
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import courseRoutes from "./routes/course";
import lessonRoutes from "./routes/lesson";
import lessonaRoutes from "./routes/lessona";
import videoRoutes from "./routes/video";
import introductionRoutes from "./routes/introduction";
import activityRoutes from "./routes/activities";
import resultRoutes from "./routes/result";
import commentRoutes from "./routes/comment";
import certificateRoutes from "./routes/certificate";
import User, { Role } from "./entities/User";

//
// ─── INIT ───────────────────────────────────────────────────────────────────────
//

const app = express();

//
// ─── SOCKET ─────────────────────────────────────────────────────────────────────
//

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

//
// ─── MIDDLEWEARS ────────────────────────────────────────────────────────────────
//

app.use(express.json());
app.use(morgan("dev"));
app.use(trim); //TRIM REQUEST BODY STRINGS.
app.use(cookieParser());
app.use(fileUpload());

//
// ─── CORS ───────────────────────────────────────────────────────────────────────
//

app.use(
  cors({
    credentials: true,
    origin: [
      `${process.env.ORIGIN}`,
      "http://eman-learning.com:3000",
      "http://eman-learning.com",
      "http://www.eman-learning.com",
      "https://eman-learning.com",
      "https://www.eman-learning.com",
    ],
  })
);

//
// ─── CONTROLLERS ────────────────────────────────────────────────────────────────
//

app.use(express.static(path.join(__dirname, "/../public")));
app.get("/", function (_, res) {
  res.send("express server");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lessonsa", lessonaRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/introductions", introductionRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/questions", questionsRoutes);
// Connect Server & DB

io.on("connection", (socket: any) => {
  console.log("user connected: " + socket.id);
  socket.on("test", (socket: any) => {
    io.emit("test", socket);
  });
});

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  console.log(`server running on PORT: ${PORT} `);
  try {
    // CREATE AN ADMIN ACCOUNT iF THERES NO USERS.
    await createConnection();
    console.log("database connected");
    let admin_account = await User.findOne({ where: { role: "admin" } });
    if (!admin_account) {
      await User.create({
        email: "admin@g.com",
        password: "123456",
        firstname: "admin",
        lastname: "admin",
        role: Role.ADMIN,
        username: "admin",
      }).save();
      console.log("admin account created");
    }
  } catch (error) {
    console.log(error);
  }
});
