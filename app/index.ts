import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { startDatabase } from "./database";
import router from "./router";
import { appPort } from "./utils/constans";

/**
 * nt4bz
 * 2021-10-04
 */

async function buildApp(): Promise<express.Application> {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(router);

  return app;
}

/** auto start async function */
(async () => {
  try {
    await startDatabase();

    const app = await buildApp();

    app.listen(appPort, () => console.log("AppRunning"));
  } catch (error) {
    console.error("GLOBAL_ERROR", error);
  }
})();
