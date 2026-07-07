const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export function resolveImage(image: string | null): string {
  if (!image) return '';
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
}
