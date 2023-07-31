import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ZingMp3 } from "zingmp3-api-full";

dotenv.config();
const server = express();

server.use(cors());

const allowedOrigins = ["http://localhost:5173"];

server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

server.get("/:id", (req, res) => {
  ZingMp3.getSong(req.params.id).then((data) => {
    res.json(data);
  });
});

server.get("/playlist/:id", (req, res) => {
  ZingMp3.getDetailPlaylist(req.params.id).then((data) => {
    res.json(data);
  });
});

server.get("/", (req, res) => {
  ZingMp3.getHome().then((value) => res.json(value.data));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
