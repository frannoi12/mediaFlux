import MediaService from "./MediaService.js";
import * as statues from "./httpStatus.js";

export default class MediaController {
    mediaService;

    constructor() {
        this.mediaService = new MediaService();
    }

    // Récupérer et afficher toutes les vidéos
    async getMedias(req, res) {
        try {
            const medias = await this.mediaService.get();
            res.status(statues.HTTP_200_OK).json(medias);
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving videos" });
        }
    }

    // Récupérer et afficher une seule vidéo par ID
    async getMedia(req, res) {
        const { id } = req.params;
        try {
            const media = await this.mediaService.get_media(parseInt(id)); 
            if (media) {
                res.status(statues.HTTP_200_OK).json(media);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Media not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving media" });
        }
    }

    async createMedia(req, res) {
        const media_data = req.body;
        try {
            const newMedia = await this.mediaService.create(media_data);
            res.status(statues.HTTP_201_OK).json(newMedia);
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error creating media" });
        }
    }

    async updateMedia(req, res) {
        const { id } = req.params;
        const { title, description, mediaPath, status } = req.body;
        try {
            const updatedMedia = await this.mediaService.update(parseInt(id), { title, description, mediaPath, status });
            if (updatedMedia) {
                res.status(statues.HTTP_200_OK).json(updatedMedia);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Media not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error updating media" });
        }
    }

    async deleteMedia(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.mediaService.delete(parseInt(id));
            if (deleted) {
                res.status(statues.HTTP_204_NO_CONTENT).send();
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Media not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error deleting media" });
        }
    }
}
