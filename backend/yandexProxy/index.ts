import express from "express";
import fetch from "node-fetch";
import multer from "multer";
import FormData from "form-data";

import { getRequestCookies, setCookies } from "./utils";
import { ApiPath, getYandexUrl, headersJSON as headers } from "./consts";

const yandexProxy = express.Router();
const jsonParser = express.json();
const upload = multer();

/** Auth */
yandexProxy.get(ApiPath.USER, async (req, res) => {
  try {
    console.log("getRequestCookies(req)", getRequestCookies(req));
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: getRequestCookies(req) as { [key: string]: string },
    });

    console.log("response", response);
    res.status(response.status).send(await response.json());
  } catch (error) {
    console.warn(error);
  }
});

yandexProxy.post(
  [ApiPath.SIGN_IN, ApiPath.SIGN_UP],
  jsonParser,
  async (req, res) => {
    console.log("req.url ", req.url);
    console.log("getYandexUrl(req.url) ", getYandexUrl(req.url));
    try {
      const response = await fetch(getYandexUrl(req.url), {
        method: req.method,
        headers: headers,
        body: JSON.stringify(req.body),
      });

      setCookies(response, res);

      res.status(response.status).send(await response.text());
    } catch (error) {
      console.warn(error);
    }
  }
);

yandexProxy.post(ApiPath.LOG_OUT, async (req, res) => {
  try {
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: getRequestCookies(req) as any,
    });

    res
      .clearCookie("uuid")
      .clearCookie("authCookie")
      .status(response.status)
      .send(await response.text());
  } catch (error) {
    console.warn(error);
  }
});

/** User */
yandexProxy.put(ApiPath.PROFILE, jsonParser, async (req, res) => {
  try {
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: {
        ...headers,
        ...(getRequestCookies(req) as any),
      },
      body: JSON.stringify(req.body),
    });

    res.status(response.status).send(await response.text());
  } catch (error) {
    console.warn(error);
  }
});

yandexProxy.put(ApiPath.AVATAR, upload.single("avatar"), async (req, res) => {
  try {
    const { buffer, originalname } = req.file;

    const formData = new FormData();
    formData.append(
      "avatar",
      (buffer as unknown) as Blob,
      encodeURIComponent(originalname)
    );

    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: {
        ...getRequestCookies(req),
      },
      body: formData as any,
    });

    res.status(response.status).send(await response.text());
  } catch (error) {
    console.warn(error);
  }
});

yandexProxy.get(`${ApiPath.RESOURCES}/*`, async (req, res) => {
  try {
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: {
        ...(getRequestCookies(req) as any),
      },
    });

    res.set({
      "content-length": response.headers.get("content-length"),
      "content-type": response.headers.get("content-type"),
    });

    response.body.on("error", (e) => {
      console.warn(e);
    });

    response.body.pipe(res);
  } catch (error) {
    console.warn(error);
  }
});

/** Leaderboard */
yandexProxy.post(ApiPath.GET_LEADERBOARD, jsonParser, async (req, res) => {
  try {
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: {
        ...headers,
        ...(getRequestCookies(req) as any),
      },
      body: JSON.stringify(req.body),
    });

    res.status(response.status).send(await response.json());
  } catch (error) {
    console.warn(error);
  }
});

yandexProxy.post(ApiPath.SET_LEADERBOARD, jsonParser, async (req, res) => {
  try {
    const response = await fetch(getYandexUrl(req.url), {
      method: req.method,
      headers: {
        ...headers,
        ...(getRequestCookies(req) as any),
      },
      body: JSON.stringify(req.body),
    });

    res.status(response.status).send(await response.text());
  } catch (error) {
    console.warn(error);
  }
});

export default yandexProxy;
