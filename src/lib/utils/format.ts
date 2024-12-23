export function formatNumberToRupiah(value: string | number) {
    const num = Math.abs(Number(value))
    const res = new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)
    return Number(value) >= 0 ? res : "- " + res
}

export function formatOptionsSelect(val: Record<string, any>[]): [string, string][] {
    return val.map(d => [d.kode + " - " + d.uraian, d.id])
}

export function formatDateIndo(val: string | Date) {
    return new Intl.DateTimeFormat('id').format(new Date(val))
}


export function formatDateInput(val: string | Date) {
    const d = new Date(val)
    return new Intl.DateTimeFormat('fr-CA').format(d)
}