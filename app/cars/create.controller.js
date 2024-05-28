import express from 'express';
import { PrismaClient } from '@prisma/client';
import {prisma} from "../prisma.js";

const router = express.Router();

router.post('/create', async (req, res) => {
    const { model, year, isSold, soldDate, managerId } = req.body;

    try {
        const newCar = await prisma.car.create({
            data: {
                model,
                year,
                isSold,
                soldDate,
                managerCars: {
                    create: {
                        managerId: parseInt(managerId)
                    }
                }
            }
        });

        // Добавление созданной машины к менеджеру
        const manager = await prisma.manager.update({
            where: { id: parseInt(managerId) },
            data: {
                cars: {
                    connect: { id: newCar.id }
                }
            },
            include: { cars: true }
        });

        res.json(newCar);
    } catch (error) {
        console.error("Ошибка при создании машины:", error);
        res.status(500).json({ error: "Произошла ошибка при создании машины" });
    }
});

export default router;