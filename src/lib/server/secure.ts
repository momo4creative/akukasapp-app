import { PRIVATE_SECRET_STRING } from "$env/static/private";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const getHashPassword = (password: string) => bcrypt.hashSync(password, 10)

export const validatePassword = (password: string, hash: string) => {
    const value = bcrypt.compareSync(password, hash)
    if (!value) throw new Error("Periksa username dan password anda !");
    return value
}

export const getToken = (payload: Payload) => JWT.sign(payload, PRIVATE_SECRET_STRING, { expiresIn: "7d" })

export const verifyToken = (token: string) => {
    try {
        return JWT.verify(token, PRIVATE_SECRET_STRING) as Payload
    } catch (e) {
        return null
    }
}