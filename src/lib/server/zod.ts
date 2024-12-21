import { z } from "zod";

export const zodParce = async<T extends z.ZodType>(request: Request, schema: T) => {
    const form = Object.fromEntries(await request.formData())
    return schema.parse(form) as z.infer<T>
}