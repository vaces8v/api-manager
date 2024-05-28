import 'colors'
import express from "express";
import AuthRoutes from "./app/auth/auth.routes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import {prisma} from "./app/prisma.js";
import {errorHandler, notFound} from "./app/middleware/error.middleware.js";
import ManagerRoutes from "./app/manager/manager.routes.js";
import CarsuploadController from "./app/cars/create.controller.js";
import ImagesController from "./app/cars/images.controller.js";
import cors from "cors";
import path from "path";
import CarGetByIdController from "./app/cars/carGetById.controller.js";
import {protect} from "./app/middleware/auth.middleware.js";

dotenv.config();

const app = express()
app.use(express.json())
if(process.env.MODE === 'development') {
    app.use(morgan("dev"));
}

app.use(cors())

const __dirname = path.resolve();

app.use('/uploads', protect, express.static(path.join(__dirname, '/uploads/')));
app.use('/api/auth', AuthRoutes)
app.use('/api/manager', protect, ManagerRoutes)
app.use('/api/car', protect, CarsuploadController)
app.use('/api/uploads', ImagesController)
app.use('/api/car',protect, CarGetByIdController)

app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {console.log(`Server started on port ${PORT}`.blue.bold)})
}

bootstrap().then(async () => {
    await prisma.$disconnect()
}).catch(async e => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})