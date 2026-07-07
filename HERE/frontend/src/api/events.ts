import api from './axios';
import axios from 'axios';

export type EventStatus = 'upcoming' | 'past';

export interface EventHighlight {
  label: string;
  icon: string;
}

export interface EventContact {
  label: string;
  email: string;
}

export interface SiteEvent {
  id: string;
  siteId: string;
  status: EventStatus;
  title: string;
  date: string;
  time: string | null;
  location: string;
  attendees: string | null;
  description: string;
  paragraphs: string[];
  highlights: EventHighlight[];
  images: string[];
  contacts: EventContact[] | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  status: EventStatus;
  title: string;
  date: string;
  time?: string;
  location: string;
  attendees?: string;
  description: string;
  paragraphs?: string[];
  highlights?: EventHighlight[];
  images?: string[];
  contacts?: EventContact[];
}

export interface UpdateEventData {
  title?: string;
  date?: string;
  time?: string | null;
  location?: string;
  attendees?: string | null;
  description?: string;
  paragraphs?: string[];
  highlights?: EventHighlight[];
  images?: string[];
  contacts?: EventContact[] | null;
}

// ── Public API (no auth) ────────────────────────────────────────────────────
const PUBLIC_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api/public';

export const getPublicEvents = (status: EventStatus) =>
  axios.get<SiteEvent[]>(`${PUBLIC_BASE}/events`, { params: { status } }).then(r => r.data);

export const getPublicEvent = (id: string) =>
  axios.get<SiteEvent>(`${PUBLIC_BASE}/events/${id}`).then(r => r.data);

// ── Admin API (site-scoped, authenticated) ──────────────────────────────────
const base = (siteId: string) => `/sites/${siteId}/events`;

export const getEvents = (siteId: string, status?: EventStatus) =>
  api.get<SiteEvent[]>(base(siteId), { params: status ? { status } : undefined }).then(r => r.data);

export const createEvent = (siteId: string, data: CreateEventData) =>
  api.post<SiteEvent>(base(siteId), data).then(r => r.data);

export const updateEvent = (siteId: string, id: string, data: UpdateEventData) =>
  api.patch<SiteEvent>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deleteEvent = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

export const reorderEvents = (siteId: string, items: { id: string; order: number }[]) =>
  api.post(`${base(siteId)}/reorder`, { items }).then(r => r.data);
