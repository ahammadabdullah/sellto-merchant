import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// string shortner
export function truncateString(str: string, maxStrLength: number): string {
  if (!str) return "";
  if (str.length > maxStrLength) {
    return str.slice(0, maxStrLength) + "...";
  } else {
    return str;
  }
}
