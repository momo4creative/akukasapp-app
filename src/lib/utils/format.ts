export function formatNumberToRupiah(value: string | number) {
    return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value))
}