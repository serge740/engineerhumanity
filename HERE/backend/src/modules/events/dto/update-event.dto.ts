export class UpdateEventDto {
  title?: string;
  date?: string;
  time?: string | null;
  location?: string;
  attendees?: string | null;
  description?: string;
  paragraphs?: string[];
  highlights?: { label: string; icon: string }[];
  images?: string[];
  contacts?: { label: string; email: string }[] | null;
}
