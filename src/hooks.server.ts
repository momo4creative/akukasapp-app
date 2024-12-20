import { verifyToken } from "$lib/server/secure";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
    event.locals.user = null
    const sessionId = event.cookies.get('sessionId')
    if (sessionId) {
        event.locals.user = verifyToken(sessionId)
    }
    return resolve(event)
}

const guard: Handle = async ({ event, resolve }) => {

    return resolve(event)
}

export const handle: Handle = sequence(auth, guard)