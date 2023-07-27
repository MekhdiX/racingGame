import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import yandexProxy from "./yandexProxy";
import { yandexProxyPrefix } from "./yandexProxy/consts";

import { sequelize } from "./db_context/postgres";
import router from "./routes";
import { options } from "./swaggerConfig";

sequelize.authenticate().then(() => {
  console.log("Connection to Postgres base established");
});

sequelize.sync({ force: true }).then(() => {
  console.log("Connection to Postgres base established");
});

const baseUrl =
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin` ||
  "mongodb://root:example@localhost:27017/my-db?authSource=admin";

mongoose
  .connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to mongodb base established");
  })
  .catch((ex) => {
    console.log(ex);
  });

const app = express();

const corsOptions = {
  origin: process.env.MAIN_HOST
    ? [process.env.MAIN_HOST]
    : ["https://127.0.0.1", "127.0.0.1"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

const url = "/api/v1";

app.use(`${url}`, router);

// Yandex proxy middleware
app.use(`${yandexProxyPrefix}`, yandexProxy);

const swaggerDocs = swaggerJsDoc(options);
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocs));

export default app;
