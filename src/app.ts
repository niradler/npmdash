import dotenv from "dotenv";
import express from "express";
import path from "path";
import packagesByUsername from "./npm/packagesByUsername";

dotenv.config();

const app = express();
const port = process.env.PORT || 8989;

interface IPackagesData {
  total: number;
  packages: string[];
  data: object[];
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/npm/dashboard/:username", async (req, res) => {
  try {
    const isTest = !!req.query.test;

    let npmInfo: IPackagesData;
    if (isTest) {
      npmInfo = require("../assets/packages.json");
    } else {
      npmInfo = await packagesByUsername(req.params.username);
    }

    const sortBy = "monthly";
    if (sortBy) {
      npmInfo.data = npmInfo.data.sort(
        (a: any, b: any) => b[sortBy] - a[sortBy]
      );
    }

    if (!npmInfo.packages || npmInfo.packages.length === 0) {
      throw new Error("Not Found!");
    }

    res.render("dashboard", npmInfo);
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
