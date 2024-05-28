import express from 'express';
import multer from 'multer';
import path from 'path';
import {prisma} from "../prisma.js";

const router = express.Router();

// Настройка Multer для сохранения файлов в папке `uploads`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Маршрут для загрузки изображения и обновления информации о машине
router.post('/car/upload/:carId', upload.single('photo'), async (req, res) => {
    const { carId } = req.params;
    const { path: imagePath } = req.file;

    try {
        const updatedCar = await prisma.car.update({
            where: { id: parseInt(carId) },
            data: {
                photos: {
                    set: [imagePath],
                },
            },
        });

        res.json(updatedCar);
    } catch (error) {
        console.error('Произошла ошибка при обновлении информации о машине:', error);
        res.status(500).json({ error: 'Произошла ошибка при обновлении информации о машине' });
    }
});

export default router;