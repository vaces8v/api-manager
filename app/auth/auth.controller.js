import {prisma} from "../prisma.js";
import asyncHandler from "express-async-handler";
import {hash, verify} from "argon2";
import {generateToken} from "./generate.token.js";

// Register user
// POST /api/auth/register
// Access public
export const registerUser = asyncHandler(async (req, res) => {
   const {name, telephon, lastname, password} = req.body;
   const isHaveUser = await prisma.manager.findUnique({
       where: {
           telephon
       }
   })

    if(isHaveUser) {
        res.status(400)
        throw new Error("Manager already exists")
    }

    const manager = await prisma.manager.create({
        data: {
            name,
            lastname,
            telephon,
            password: await hash(password)
        },
        select: {
            name: true,
        }
    })

    const token = generateToken(manager.id);

    res.json({manager, token});
})

// Login user
// POST /api/auth/login
// Access public
export const authorizationUser = asyncHandler(async (req, res) => {
    const {telephon, password} = req.body;
    const manager = await prisma.manager.findUnique({
        where: {
            telephon
        }
    })

    const isValidPassword = await verify(manager.password, password);

    if(manager && isValidPassword) {
        const token = generateToken(manager.id);
        res.json({manager, token});
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }


    res.json({manager});
})
