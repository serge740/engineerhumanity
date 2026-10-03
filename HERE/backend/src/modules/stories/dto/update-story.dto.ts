export class UpdateStoryDto {
  name?: string;
  role?: string | null;
  image?: string | null;
  imageFocusX?: number | null;
  imageFocusY?: number | null;
  summary?: string | null;
  story?: string | null;
  intro?: string | null;
  sections?: { title: string; content: string }[] | null;
}
