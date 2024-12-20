import { PRIVATE_SECRET_STRING } from "$env/static/private";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const getHashPassword = (password: string) => bcrypt.hashSync(password, 10)

export const validatePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash)

export const getToken = (payload: string) => JWT.sign(payload, PRIVATE_SECRET_STRING, { expiresIn: '7d' })

export const verifyToken = (token: string) => {
    try {
        return JWT.verify(token, PRIVATE_SECRET_STRING)
    } catch (e) {
        return null
    }
}