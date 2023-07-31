import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ZingMp3 } from "zingmp3-api-full";

dotenv.config();
const server = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

server.use(cors());

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
