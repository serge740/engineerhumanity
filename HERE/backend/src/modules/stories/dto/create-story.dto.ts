export class CreateStoryDto {
  group: 'success' | 'success-summary' | 'testimony';
  name: string;
  role?: string;
  image?: string;
  summary?: string;
  story?: string;
  intro?: string;
  sections?: { title: string; content: string }[];
}
