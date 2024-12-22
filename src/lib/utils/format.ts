export function formatNumberToRupiah(value: string | number) {
    return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value))
}

export function formatOptionsSelect(val: Record<string, any>[]): [string, string][] {
    return val.map(d => [d.kode + " - " + d.uraian, d.id])
}


export function formatDateInput(val: string | Date) {
    const d = new Date(val)
    return new Intl.DateTimeFormat('fr-CA').format(d)
}