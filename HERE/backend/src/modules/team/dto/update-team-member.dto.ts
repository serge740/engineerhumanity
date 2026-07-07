export class UpdateTeamMemberDto {
  name?: string;
  title?: string;
  credentials?: string | null;
  image?: string | null;
  linkedIn?: string | null;
  bio?: string | null;
  role?: 'chair' | 'vice-chair' | 'executive' | 'member' | null;
  category?: 'leadership' | 'operations' | 'programs' | 'projects' | null;
}
