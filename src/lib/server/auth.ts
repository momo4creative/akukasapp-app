import { fail, redirect, type RequestEvent } from "@sveltejs/kit"
import { zodParce } from "./zod"
import { loginSchema, registerSchema } from "$lib/schema/auth"
import { getHashPassword, getToken, validatePassword } from "./secure"
import { handleFail } from "$lib/utils/handle-action"

export const authRegister = async (e: RequestEvent) => {
    try {
        const data = await zodParce(e.request, registerSchema)
        const { username, password: prePassword } = data

        const password = getHashPassword(prePassword)
        return { username, password }
    } catch (e) {
        return fail(400, handleFail<typeof registerSchema>(e))
    }
}


export const authLogin = async (e: RequestEvent) => {
    try {
        const data = await zodParce(e.request, loginSchema)

        validatePassword(data.password, "$2b$10$f2232ioumRI1oVvsXiAczOcRD3IOFZLcbMoLWx26UmJsfPA7gcHVO")

        const token = getToken({ ...data, session: 'adsd' })

        e.cookies.set('sessionId', token, { path: '/', maxAge: 60 * 60 * 24 * 7 })
        return
    } catch (e) {
        return fail(400, handleFail<typeof loginSchema>(e))
    }
}


export const authLogout = async (e: RequestEvent) => {
    try {
        e.cookies.delete('sessionId', { path: '/' })
    } catch (e) {
        return fail(400, handleFail(e))
    }
    redirect(303, '/auth/login')
}