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

// uniq code generator that takes in current time
export const generateUniqueCode = (currentTime: any): string | null => {
  const uniqueCode =
    Math.random().toString(36).substring(2, 14) +
    currentTime
      .toISOString()
      .replace(/[-:.TZ]/g, Math.random().toString(32).substring(2, 3)) +
    Math.random().toString(36).substring(2, 14) +
    Math.random().toString(32).substring(2, 8) +
    Math.random().toString(36).substring(2, 14);
  if (uniqueCode) return uniqueCode.toString();
  return uniqueCode;
};
