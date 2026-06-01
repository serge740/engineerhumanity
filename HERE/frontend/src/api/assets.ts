import api from './axios';

export interface SiteAsset {
  id: string;
  siteId: string;
  type: 'image' | 'font' | string;
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

const base = (siteId: string) => `/sites/${siteId}/assets`;

export const getAssets = (siteId: string) =>
  api.get<SiteAsset[]>(base(siteId)).then((r) => r.data);

export const uploadAsset = (
  siteId: string,
  file: File,
  type: 'image' | 'font' = 'image',
) => {
  const form = new FormData();
  form.append('file', file);
  return api
    .post<SiteAsset>(`${base(siteId)}/upload?type=${type}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);
};

export const deleteAsset = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then((r) => r.data);

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
