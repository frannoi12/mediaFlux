import express from "express";
import MediaController from "./MediaController.js";

export default class MediaRouter {
    router;
    mediaController;

    constructor() {
        this.router = express.Router();
        this.mediaController = new MediaController();
        this.initializeRoutes();
    }

    /**
     * @swagger
     * tags:
     *   name: Media
     *   description: API pour la gestion des médias
     */
    initializeRoutes() {
        /**
         * @swagger
         * /media:
         *   get:
         *     summary: Récupère tous les médias
         *     tags: [Media]
         *     responses:
         *       200:
         *         description: Liste des médias
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Media'
         */
        this.router.get('/', this.mediaController.getMedias.bind(this.mediaController));

        /**
         * @swagger
         * /media/create:
         *   post:
         *     summary: Crée un nouveau média
         *     tags: [Media]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Media'
         *     responses:
         *       201:
         *         description: Média créé avec succès
         *       400:
         *         description: Données invalides
         */
        this.router.post('/create', this.mediaController.createMedia.bind(this.mediaController));

        /**
         * @swagger
         * /media/{id}:
         *   get:
         *     summary: Récupère un média par ID
         *     tags: [Media]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID du média
         *     responses:
         *       200:
         *         description: Média trouvé
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Media'
         *       404:
         *         description: Média non trouvé
         */
        this.router.get('/:id', this.mediaController.getMedia.bind(this.mediaController));

        /**
         * @swagger
         * /media/update/{id}:
         *   put:
         *     summary: Met à jour un média
         *     tags: [Media]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID du média
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Media'
         *     responses:
         *       200:
         *         description: Média mis à jour avec succès
         *       404:
         *         description: Média non trouvé
         */
        this.router.put('/update/:id', this.mediaController.updateMedia.bind(this.mediaController));

        /**
         * @swagger
         * /media/delete/{id}:
         *   delete:
         *     summary: Supprime un média
         *     tags: [Media]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID du média
         *     responses:
         *       200:
         *         description: Média supprimé avec succès
         *       404:
         *         description: Média non trouvé
         */
        this.router.delete('/delete/:id', this.mediaController.deleteMedia.bind(this.mediaController));
    }

    /**
     * Retourne le routeur des médias
     * @returns {express.Router}
     */
    getRouter() {
        return this.router;
    }
}
