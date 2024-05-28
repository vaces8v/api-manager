import express from "express";
import {getCarsByManagerId, getManagerWithCarsById} from "./manager.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/cars/:managerId").get(protect, getCarsByManagerId)
router.route("/:managerId").get(protect, getManagerWithCarsById)

export default router;