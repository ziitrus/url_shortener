import { Router } from "express";
import urlShortener from "../controllers/urlShortener"
import analytics from "../controllers/analytics"
import { isUrl } from "../middlewares/urlCheck"
import { checkUrlCache } from "../middlewares/checkCache";
import { checkExpiration } from "../middlewares/checkExpiration";

const router = Router()
/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirige vers l'URL originale
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Code court de l'URL à rediriger
 *     responses:
 *       302:
 *         description: Redirection vers l'URL originale
 *       401:
 *         description: URL trouvée mais expirée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URL expired"
 *       404:
 *         description: URL non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No shortCode Found"
 */
router.get("/:shortCode", checkUrlCache, checkExpiration, urlShortener.getShort)
/**
 * @swagger
 * /analytics/{shortCode}:
 *   get:
 *     summary: Récupère les statistiques d'une URL raccourcie
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Code court de l'URL dont on veut les statistiques
 *     responses:
 *       200:
 *         description: Statistiques trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clicks:
 *                   type: number
 *                   description: Nombre de clics sur l'URL
 *                   example: 42
 *                 lastAccessed:
 *                   type: string
 *                   format: date-time
 *                   description: Dernière date d'accès
 *                   example: "2024-03-20T15:30:00Z"
 *       404:
 *         description: Code court non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Analytics not found"
 */
router.get("/analytics/:shortCode", analytics.getStats)
/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Crée une URL raccourcie
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: L'URL à raccourcir
 *                 example: "https://www.example.com/very-long-url"
 *               expiration:
 *                 type: string
 *                 description: Durée de validité de l'URL (optionnel)
 *                 example: "24h"
 *     responses:
 *       200:
 *         description: URL raccourcie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortCode:
 *                   type: string
 *                   description: Code court généré
 *                   example: "abc123"
 *                 longUrl:
 *                   type: string
 *                   description: URL originale
 *                   example: "https://www.example.com/very-long-url"
 *       400:
 *         description: URL invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid URL format"
 */
router.post("/shorten", isUrl, urlShortener.shorten)

export = router