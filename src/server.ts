import express, { Express, Request, Response } from "express";
import config from "./config/config";
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
import { IndexRouter } from "./controllers/routes/index";

dotenv.config();

const app: Express = express();
const port = config.port;

app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
    ],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", IndexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
