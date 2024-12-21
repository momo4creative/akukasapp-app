import { goto } from "$app/navigation"
import type { ActionResult } from "@sveltejs/kit"
import { z } from "zod"

type Params<S extends Record<string, any>, F extends z.ZodType> = {
    onSubmit?: () => void
    onSuccess?: (arg: S | undefined) => void
    onError?: (arg: ResultHandleFail<F> | undefined) => void
    redirectTo?: string
}


export type ResultHandleFail<T extends z.ZodType> = {
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
    let errors = undefined
    let message = 'Kesalahan system !'

    if (e instanceof z.ZodError) {
        errors = e.flatten().fieldErrors
        message = "Kesalahan validasi form !"
    } else if (e instanceof Error) {
        message = e.message
    }

    return { errors, message }
}