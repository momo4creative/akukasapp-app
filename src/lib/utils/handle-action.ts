import { goto } from "$app/navigation"
import type { idSchema } from "$lib/schema/id"
import { redirect, type ActionResult } from "@sveltejs/kit"
import { z } from "zod"

type Params<S extends Record<string, any>, F extends z.ZodType> = {
    onSubmit?: () => void
    onSuccess?: (arg: S | undefined) => void
    onError?: (arg: ResultHandleFail<F> | undefined) => void
    redirectTo?: string
}


export type ResultHandleFail<T extends z.ZodType = typeof idSchema> = {
    status: 400 | 401 | 404 | number
    errors?: z.inferFlattenedErrors<T>['fieldErrors']
    message: string
}

export const handleSubmit = <S extends Record<string, any>, F extends z.ZodType>({ onSubmit, onError, onSuccess, redirectTo }: Params<S, F> = {}) => {
    // 
    onSubmit && onSubmit()
    // 
    return async ({ result, formElement }: { result: ActionResult<S, ResultHandleFail<F>>; formElement: HTMLFormElement }) => {
        // 
        if (result.type == 'failure') {
            console.log('Failure => ', result.data);
            onError && onError(result.data)
            return
        }
        if (result.type == 'success') {
            console.log('Success => ', result.data);
            formElement.reset()
            onSuccess && onSuccess(result.data)
            redirectTo && goto(redirectTo)
            return
        }
    }
}

export const handleFail = <T extends z.ZodType>(e: unknown): ResultHandleFail<T> => {
    let status = 404
    let errors = undefined
    let message = 'Kesalahan system !'

    if (e instanceof z.ZodError) {
        status = 400
        errors = e.flatten().fieldErrors
        message = "Kesalahan validasi form !"
    } else if (e instanceof Error) {
        status = 400
        message = e.message

        if (e.message.includes('INVALID_AUTH')) {
            status = 401
        }
    }

    return { errors, message, status }
}