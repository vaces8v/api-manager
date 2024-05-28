import express from 'express';
import {prisma} from "../prisma.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const car = await prisma.car.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                managerCars: {
                    include: {
                        manager: true
                    }
                }
            }
        });

        if (!car) {
            return res.status(404).json({ error: "Машина не найдена" });
        }

        res.json(car);
    } catch (error) {
        console.error("Ошибка при получении данных о машине:", error);
        res.status(500).json({ error: "Произошла ошибка при получении данных о машине" });
    }
})

export default router;