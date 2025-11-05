/**
 * @swagger
 * tags:
 *   name: Arbitros
 *   description: Endpoints para árbitros (proxy hacia Spring Boot)
 */
import { Router } from "express";
import * as controller from "../controllers/arbitrosController.js";

const router = Router();

// Autenticación
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de árbitro
 *     tags: [Arbitros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               nombre: { type: string }
 *               fotoUrl: { type: string }
 *     responses:
 *       201: { description: Creado }
 */
router.post("/auth/register", controller.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de árbitro
 *     tags: [Arbitros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.post("/auth/login", controller.login);

// Recursos básicos
/**
 * @swagger
 * /api/arbitros:
 *   get:
 *     summary: Listar árbitros
 *     tags: [Arbitros]
 *     responses:
 *       200: { description: OK }
 */
router.get("/arbitros", controller.list);

/**
 * @swagger
 * /api/arbitros/{id}:
 *   get:
 *     summary: Detalle de árbitro
 *     tags: [Arbitros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: OK }
 */
router.get("/arbitros/:id", controller.detail);

/**
 * @swagger
 * /api/arbitros/{id}/partidos:
 *   get:
 *     summary: Partidos asignados al árbitro
 *     tags: [Arbitros]
 */
router.get("/arbitros/:id/partidos", controller.partidos);

/**
 * @swagger
 * /api/arbitros/{id}/asignaciones:
 *   get:
 *     summary: Asignaciones del árbitro
 *     tags: [Arbitros]
 */
router.get("/arbitros/:id/asignaciones", controller.asignaciones);

/**
 * @swagger
 * /api/arbitros/{id}/liquidaciones:
 *   get:
 *     summary: Liquidaciones del árbitro
 *     tags: [Arbitros]
 */
router.get("/arbitros/:id/liquidaciones", controller.liquidaciones);

// Imagenes S3 (solo listar/ejemplo)
/**
 * @swagger
 * /api/s3/images:
 *   get:
 *     summary: Lista de imágenes (URLs públicas en S3)
 *     tags: [Arbitros]
 *     responses:
 *       200: { description: OK }
 */
router.get("/s3/images", controller.listImages);

export default router;