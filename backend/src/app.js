import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import mongoose from "mongoose";
import cors from "cors";
import userRouters from "./routes/users.routes.js"
const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use("/api/v1/users",userRouters)

app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

const start = async () => {
  app.set("mongo_user");
  const connectionDB = await mongoose.connect(
    "mongodb+srv://huddlex:huddlex@huddlex.6nchk7q.mongodb.net/"
  );
  console.log("mongo conneected", connectionDB.connection.host);
  server.listen(app.get("port"), () => {
    console.log("I am in backend");
  });

  //   app.listen("8000", () => {
  //     console.log("I am in backend");
  //   });
};
start();
