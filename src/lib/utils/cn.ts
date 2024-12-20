import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export default (...args: ClassValue[]) => twMerge(clsx(args))