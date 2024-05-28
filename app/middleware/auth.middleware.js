import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {prisma} from "../prisma.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        if (token === '') {
            res.status(401);
            return next(new Error("Not authorized, no token"));
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

            const userFound = await prisma.manager.findUnique({
                where: {
                    id: decoded.userId
                },
                select: {
                    name: true,
                }
            })

            if(userFound) {
                req.user = userFound;
                next();
            } else {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        } catch (e) {
            res.status(401);
            return res.json({message: e.message});
        }
    }
})