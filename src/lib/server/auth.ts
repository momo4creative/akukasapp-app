import { fail, redirect, type RequestEvent } from "@sveltejs/kit"
import { zodParce } from "./zod"
import { loginSchema, registerSchema } from "$lib/schema/auth"
import { getHashPassword, getToken, validatePassword } from "./secure"
import { handleFail } from "$lib/utils/handle-action"
import db, { setSession } from "./db"

export const authRegister = async (e: RequestEvent) => {
    try {
        const data = await zodParce(e.request, registerSchema)
        const { username, password: prePassword } = data

        const password = getHashPassword(prePassword)

        db.params = { auth: { register: { username, password } } }
        const user = await db.fetching<User>()
        return { username: user.username }
    } catch (e) {
        return fail(400, handleFail<typeof registerSchema>(e))
    }
}


export const authLogin = async (e: RequestEvent) => {
    try {
        const data = await zodParce(e.request, loginSchema)

        db.params = { auth: { login: data.username } }
        const user = await db.fetching<Required<User>>()

        validatePassword(data.password, user.password)

        const { username, session } = user
        setSession(session)
        const token = getToken({ username, session })

        e.cookies.set('sessionId', token, { path: '/', maxAge: 60 * 60 * 24 * 7 })
        return
    } catch (e) {
        return fail(400, handleFail<typeof loginSchema>(e))
    }
}


export const authLogout = async (e: RequestEvent) => {
    try {
        db.params = { auth: { logout: db.session } }
        const res = db.fetching<boolean>()
        res.then(v => {
            console.log('Logout:', v);
        })

        e.cookies.delete('sessionId', { path: '/' })
    } catch (e) {
        return fail(400, handleFail(e))
    }
    redirect(303, '/auth/login')
}