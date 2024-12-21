import { z } from "zod";
import { idSchema } from "./id";

export const createAkunSchema = z.object({
    kode: z.string().min(4).pipe(z.coerce.number()),
    uraian: z.string().min(4).trim(),
    batas: z.string().pipe(z.coerce.number()).catch(0),
})

export const updateAkunSchema = createAkunSchema.merge(idSchema)