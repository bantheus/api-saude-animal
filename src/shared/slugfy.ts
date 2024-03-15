export function slugfy(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
