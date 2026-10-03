export class CreateTeamMemberDto {
  group: 'board' | 'management';
  name: string;
  title: string;
  credentials?: string;
  image?: string;
  imageFocusX?: number | null;
  imageFocusY?: number | null;
  linkedIn?: string;
  bio?: string;
  role?: 'chair' | 'vice-chair' | 'executive' | 'member';
  category?: 'leadership' | 'operations' | 'programs' | 'projects';
}
