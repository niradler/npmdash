import dotenv from "dotenv";
import express from "express";
import path from "path";
import packagesByUsername from "./npm/packagesByUsername";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

interface IPackagesData {
  total: number;
  packages: string[];
  data: object;
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/npm/dashboard/:username", async (req, res) => {
  try {
    const isTest = !!req.query.test;

    let data: IPackagesData;
    if (isTest) {
      data = require("../packages.json");
    } else {
      data = await packagesByUsername(req.params.username);
    }

    if (data.packages.length === 0) {
      throw new Error("Not Found!");
    }

    res.render("dashboard", data);
  } catch (error) {
    res.render("error", { errorMessage: error.message });
  }
});

app.get("/npm/packages/:username", async (req, res) => {
  try {
    const data = await packagesByUsername(req.params.username);

    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
