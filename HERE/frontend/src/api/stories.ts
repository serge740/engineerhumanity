import api from './axios';
import axios from 'axios';

export type StoryGroup = 'success' | 'success-summary' | 'testimony';

export interface StorySection {
  title: string;
  content: string;
}

export interface Story {
  id: string;
  siteId: string;
  group: StoryGroup;
  name: string;
  role: string | null;
  image: string | null;
  summary: string | null;
  story: string | null;
  intro: string | null;
  sections: StorySection[] | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoryData {
  group: StoryGroup;
  name: string;
  role?: string;
  image?: string;
  summary?: string;
  story?: string;
  intro?: string;
  sections?: StorySection[];
}

export interface UpdateStoryData {
  name?: string;
  role?: string | null;
  image?: string | null;
  summary?: string | null;
  story?: string | null;
  intro?: string | null;
  sections?: StorySection[] | null;
}

// ── Public API (no auth) ────────────────────────────────────────────────────
const PUBLIC_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api/public';

export const getPublicStories = (group: StoryGroup) =>
  axios.get<Story[]>(`${PUBLIC_BASE}/stories`, { params: { group } }).then(r => r.data);

// ── Admin API (site-scoped, authenticated) ──────────────────────────────────
const base = (siteId: string) => `/sites/${siteId}/stories`;

export const getStories = (siteId: string, group?: StoryGroup) =>
  api.get<Story[]>(base(siteId), { params: group ? { group } : undefined }).then(r => r.data);

export const createStory = (siteId: string, data: CreateStoryData) =>
  api.post<Story>(base(siteId), data).then(r => r.data);

export const updateStory = (siteId: string, id: string, data: UpdateStoryData) =>
  api.patch<Story>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deleteStory = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

export const reorderStories = (siteId: string, items: { id: string; order: number }[]) =>
  api.post(`${base(siteId)}/reorder`, { items }).then(r => r.data);
