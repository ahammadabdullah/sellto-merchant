import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as date_fns_formatter } from "date-fns";

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

export function dateFormatter(isoDateTime: Date | string) {
  const date =
    typeof isoDateTime === "string" ? new Date(isoDateTime) : isoDateTime; // Already a Date object

  const result = date_fns_formatter(date, "hh:mmaaa, dd LLL yyyy");
  return result;
}

export function customDateFormatter({
  isoDateTime,
  customFormat,
}: {
  isoDateTime: Date | string | number;
  customFormat?: string;
}): string {
  const date =
    typeof isoDateTime === "string" ? new Date(isoDateTime) : isoDateTime; // Already a Date object
  let format = "hh:mmaaa, dd LLL yyyy";
  if (customFormat) format = customFormat;
  const result = date_fns_formatter(date, format);
  return result;
}

export function capitalizeFirstLetter(
  string: string | undefined
): string | undefined {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function timeAgo(date: Date): string {
  const now = new Date();
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date";
  }
  if (date > now) {
    return "In the future";
  }
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export const parseString = (
  input: string,
  option: "newline" | "comma",
  removeDuplicates?: boolean,
  returnString?: boolean
): string[] | string => {
  const delimiter = option === "newline" ? "\n" : ",";
  let result = input
    .split(delimiter)
    .map((str) => str.trim())
    .filter(Boolean);
  if (removeDuplicates) {
    const uniqueResults: string[] = [];
    result.forEach((item) => {
      if (!uniqueResults.includes(item)) {
        uniqueResults.push(item);
      }
    });
    result = uniqueResults;
  }
  if (returnString) {
    return result.join(delimiter);
  }
  return result;
};
