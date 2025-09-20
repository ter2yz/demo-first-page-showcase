import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smartRedirect(router: AppRouterInstance, url: string) {
  try {
    const isExternal =
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("//");
    if (isExternal) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  } catch {
    window.location.href = url;
  }
}

export function formatAustralianMobile(raw: string): string {
  if (!raw) return "";
  let formatted = raw;
  if (raw.length > 4) formatted = raw.slice(0, 4) + " " + raw.slice(4);
  if (raw.length > 7)
    formatted = formatted.slice(0, 8) + " " + formatted.slice(8);
  return formatted;
}

export function stripNonDigits(input: string): string {
  return input.replace(/\D/g, "");
}
