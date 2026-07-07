import api from './axios';
import axios from 'axios';

export type TeamGroup = 'board' | 'management';
export type BoardRole = 'chair' | 'vice-chair' | 'executive' | 'member';
export type ManagementCategory = 'leadership' | 'operations' | 'programs' | 'projects';

export interface TeamMember {
  id: string;
  siteId: string;
  group: TeamGroup;
  name: string;
  title: string;
  credentials: string | null;
  image: string | null;
  linkedIn: string | null;
  bio: string | null;
  role: BoardRole | null;
  category: ManagementCategory | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberData {
  group: TeamGroup;
  name: string;
  title: string;
  credentials?: string;
  image?: string;
  linkedIn?: string;
  bio?: string;
  role?: BoardRole;
  category?: ManagementCategory;
}

export interface UpdateTeamMemberData {
  name?: string;
  title?: string;
  credentials?: string | null;
  image?: string | null;
  linkedIn?: string | null;
  bio?: string | null;
  role?: BoardRole | null;
  category?: ManagementCategory | null;
}

// ── Public API (no auth) ────────────────────────────────────────────────────
const PUBLIC_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api/public';

export const getPublicTeamMembers = (group: TeamGroup) =>
  axios.get<TeamMember[]>(`${PUBLIC_BASE}/team-members`, { params: { group } }).then(r => r.data);

// ── Admin API (site-scoped, authenticated) ──────────────────────────────────
const base = (siteId: string) => `/sites/${siteId}/team-members`;

export const getTeamMembers = (siteId: string, group?: TeamGroup) =>
  api.get<TeamMember[]>(base(siteId), { params: group ? { group } : undefined }).then(r => r.data);

export const createTeamMember = (siteId: string, data: CreateTeamMemberData) =>
  api.post<TeamMember>(base(siteId), data).then(r => r.data);

export const updateTeamMember = (siteId: string, id: string, data: UpdateTeamMemberData) =>
  api.patch<TeamMember>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deleteTeamMember = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

export const reorderTeamMembers = (siteId: string, items: { id: string; order: number }[]) =>
  api.post(`${base(siteId)}/reorder`, { items }).then(r => r.data);
