import { prisma } from "../prisma.js";
import asyncHandler from "express-async-handler";

// Register user
// POST /api/manager/cars/:managerId
// Private public
export const getCarsByManagerId = asyncHandler(async (req, res) => {
    const { managerId } = req.params;

    try {
        // Находим все машины, принадлежащие данному менеджеру
        const cars = await prisma.car.findMany({
            where: {
                managerCars: {
                    some: {
                        managerId: parseInt(managerId)
                    }
                }
            },
            select: {
                id: true,
                model: true,
                year: true,
                isSold: true,
                soldDate: true,
                photos: true
            }
        });

        res.json({ cars });
    } catch (error) {
        console.error("Ошибка при получении машин для менеджера", error);
        res.status(500).json({ error: "Произошла ошибка при получении машин для менеджера" });
    }
});

export const getManagerWithCarsById = async (req, res) => {
    const { managerId } = req.params;

    try {
        const manager = await prisma.manager.findUnique({
            where: {
                id: parseInt(managerId)
            },
            include: {
                cars: {
                    include: {
                        car: true
                    }
                }
            }
        });

        if (!manager) {
            return res.status(404).json({ error: "Менеджер не найден" });
        }

        res.json(manager);
    } catch (error) {
        console.error("Ошибка при получении данных о менеджере с автомобилями:", error);
        res.status(500).json({ error: "Произошла ошибка при получении данных о менеджере с автомобилями" });
    }
};