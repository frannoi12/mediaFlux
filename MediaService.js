import { PrismaClient } from './prisma/generated/client/index.js';

const prisma = new PrismaClient();

export default class MediaService {
    // Créer un nouveau média
    async create(media_data) {
        try {
            return await prisma.media.create({
                data: media_data,
            });
        } catch (error) {
            throw new Error(`Error creating media: ${error.message}`);
        }
    }

    // Récupérer tous les médias
    async get() {
        try {
            return await prisma.media.findMany();
        } catch (error) {
            throw new Error(`Error retrieving medias: ${error.message}`);
        }
    }

    // Récupérer un média par ID
    async get_media(id) {
        try {
            const media = await prisma.media.findUnique({
                where: { id: id },
            });
            if (!media) {
                throw new Error("Media not found");
            }
            return media;
        } catch (error) {
            throw new Error(`Error retrieving media: ${error.message}`);
        }
    }

    // Mettre à jour un média par ID
    async update(id, media_data) {
        try {
            const updatedMedia = await prisma.media.update({
                where: { id: id },
                data: media_data,
            });
            return updatedMedia;
        } catch (error) {
            throw new Error(`Error updating media: ${error.message}`);
        }
    }

    // Supprimer un média par ID
    async delete(id) {
        try {
            await prisma.media.delete({
                where: { id: id },
            });
            return { message: "Media deleted successfully" };
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error("Media not found");
            }
            throw new Error(`Error deleting media: ${error.message}`);
        }
    }
}
