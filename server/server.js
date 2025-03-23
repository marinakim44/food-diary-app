import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/records.js";

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Express server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
