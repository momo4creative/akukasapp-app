import { z } from "zod";

export const createTransaksiSchema = z.object({
    kode: z.string().min(1, "Wajib diisi !"),
    tanggal: z.string().pipe(z.coerce.date()),
    kredit_id: z.string().uuid(),
    debit_id: z.string().uuid(),
    uraian: z.string().min(1, "Wajib diisi !").trim(),
    nilai: z.string().min(1, "Wajib diisi !").pipe(z.coerce.number()),
})


export const createTransaksiSchemaTranform = createTransaksiSchema.transform(v => {
    const { kredit_id, debit_id, nilai, ...rest } = v
    let data = []
    data.push({
        akun_id: kredit_id,
        nilai: -nilai,
        ...rest
    })
    data.push({
        akun_id: debit_id,
        nilai,
        ...rest
    })
    return data
})