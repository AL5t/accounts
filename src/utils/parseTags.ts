import type { Tag } from "@/types/account";

export function parseTags(value: string): Tag[] {
  return value
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
    .map(text => ({ text }));
}