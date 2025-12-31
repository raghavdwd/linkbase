import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * merging tailwind classes using clsx and tailwind-merge
 * @param inputs classes to merge
 * @returns merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
