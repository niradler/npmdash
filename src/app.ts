import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
