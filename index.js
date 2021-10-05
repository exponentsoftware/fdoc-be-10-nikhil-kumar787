// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errors";
import passport from "passport";
import "./passport";

// const env = require("dotenv");
import env from "dotenv";
env.config();

import todoRoute from "./route/todoRoute.js";
import authRoute from "./route/authRoute.js";
import featureRoute from "./route/featureRoute";
import amdinRoute from "./route/adminRoute";
import downloadRoute from "./route/downloadRoute";
import paymentRoute from "./route/paymentRoute";

const app = express();

app.use(express.json());

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json("Secret Data");
  }
);

app.use("/todo", todoRoute);
app.use("/auth", authRoute);
app.use("/feature", featureRoute);
app.use("/admin", amdinRoute);
app.use("/download", downloadRoute);
app.use("/payment", paymentRoute);

// DB conection
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("Connected to Mongo");
  })
  .on("error", function (err) {
    console.log("Mongo Error", err);
  });

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

// app.use(notFound);
app.use(errorHandler);

app.listen(3002, () => {
  console.log("Server is up and running at the port 3002");
});
