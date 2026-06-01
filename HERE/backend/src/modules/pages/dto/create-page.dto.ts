export class CreatePageDto {
  slug: string;
  title: string;
  description?: string;
  html?: any[];
  metadata?: {
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
}
