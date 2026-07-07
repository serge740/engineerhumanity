export class UpdateStoryDto {
  name?: string;
  role?: string | null;
  image?: string | null;
  summary?: string | null;
  story?: string | null;
  intro?: string | null;
  sections?: { title: string; content: string }[] | null;
}
