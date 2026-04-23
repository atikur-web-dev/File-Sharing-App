import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// FIle size format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// File upload time format
export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just Now";
  if (diffMins < 60) return `${diffMins} Minutes ago`;
  if (diffHours < 24) return `${diffHours} Hours ago`;
  if (diffDays < 7) return `${diffDays} Days ago`;

  return d.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Date formate
export function formatDate(
  date: Date | string,
  format: "short" | "long" | "datetime" | "time" = "short",
): string {
  const d = new Date(date);

  const formats = {
    short: { month: "short", day: "numeric", year: "numeric" } as const,
    long: { month: "long", day: "numeric", year: "numeric" } as const,
    datetime: {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    } as const,
    time: { hour: "2-digit", minute: "2-digit" } as const,
  };

  return d.toLocaleDateString("en-US", formats[format]);
}

// To make string short and add "..." at the end
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + "...";
}

// Generate random hex color
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// To get a initials form name like Atikur Rahman = AR
export function getInitials(name: string): string {
  if (!name) return "";

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// To copy Clipboard text
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.log("Unable to copy", err);
    // Fallback for old browser
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

// Function call debounce
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };

  (debounced as typeof debounced & { cancel: () => void }).cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debounced as typeof debounced & { cancel: () => void };
}

// function weather the file type is image or not alo PDF
export function isImage(mimetype: string): boolean {
  return mimetype.startsWith("image/");
}
export function isPDF(mimetype: string): boolean {
  return mimetype === "application/pdf";
}

// Function to choose appropriet icons based on file mime type
export function getFileIconType(mimetype: string): string {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype === "application/pdf") return "pdf";
  if (mimetype.includes("word") || mimetype.includes("document"))
    return "document";
  if (mimetype.includes("excel") || mimetype.includes("spreadsheet"))
    return "spreadsheet";
  if (mimetype.includes("powerpoint") || mimetype.includes("presentation"))
    return "presentation";
  if (mimetype.startsWith("text/")) return "text";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype.startsWith("audio/")) return "audio";
  if (mimetype.includes("zip") || mimetype.includes("compressed"))
    return "archive";
  return "file";
}

// function for waiting for a certain time
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function for generation random ID
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
