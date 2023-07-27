import express from "express";

import {
  createComment,
  createFeedBack,
  createTopic,
  createUserTheme,
  getTopics,
  getUserTheme,
} from "../controllers";

const router = express.Router();

/* -------- FEEDBACK --------*/

/**
 * @openapi
 * tags:
 *   - name: FeedBack
 *     description: Ручки для формы обратной связи
 *   - name: Theme
 *     description: Ручки для темизации
 *   - name: Forum
 *     description: Ручки для для форума
 * components:
 *   schemas:
 *     FeedBack:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           format: number
 *         name:
 *           type: string
 *           format: string
 *         email:
 *           type: string
 *           format: string
 *         text:
 *           type: string
 *           format: string
 *     Theme:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           format: number
 *         theme:
 *           type: string
 *           format: string
 *         user:
 *           type: string
 *           format: string
 *     Topic:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *         user:
 *           type: string
 *           format: string
 *         title:
 *           type: string
 *           format: string
 *         description:
 *           type: string
 *           format: string
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *         user:
 *           type: string
 *           format: string
 *         comment:
 *           type: string
 *           format: string
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: number
 *               user:
 *                 type: string
 *                 format: string
 *               comment:
 *                 type: string
 *                 format: string
 */

/**
 * @openapi
 * /feedback:
 *   post:
 *     tags: ['FeedBack']
 *     description: Добавление нового обращения
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FeedBack'
 *     responses:
 *       201:
 *         description: Возвращает добавленное обращение
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedBack'
 */
router.post("/feedback", createFeedBack);

/* -------- THEMA --------*/

/**
 * @openapi
 * /theme:
 *   post:
 *     tags: ['Theme']
 *     description: Добавление темы пользователя
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Theme'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                  format: string
 */
router.post("/theme", createUserTheme);

/**
 * @openapi
 * /theme:
 *   get:
 *     tags: ['Theme']
 *     description: Получение темы пользователя
 *     parameters:
 *       - name: user
 *         required: true
 *         in: Пользователь
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: string
 */
router.get("/theme", getUserTheme);

/**
 * @openapi
 * /forum/topic:
 *   get:
 *     tags: ['Forum']
 *     description: Получение топиков
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
router.get("/forum/topic", getTopics);

/**
 * @openapi
 * /forum/topic:
 *   post:
 *     tags: ['Forum']
 *     description: Добавление топика
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Topic'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 */
router.post("/forum/topic", createTopic);

/**
 * @openapi
 * /forum/comment:
 *   post:
 *     tags: ['Forum']
 *     description: Добавление комментария
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
router.post("/forum/comment", createComment);

export default router;
