export class CreateEventDto {
  status: 'upcoming' | 'past';
  title: string;
  date: string;
  time?: string;
  location: string;
  attendees?: string;
  description: string;
  paragraphs?: string[];
  highlights?: { label: string; icon: string }[];
  images?: string[];
  contacts?: { label: string; email: string }[];
}
