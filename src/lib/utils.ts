import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma segura, resolviendo conflictos 
 * (ej. si pasamos 'p-4' y 'p-8', se queda con 'p-8').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
