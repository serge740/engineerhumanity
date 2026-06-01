import api from './axios';

export interface AdminProfile {
  id: string;
  adminName: string;
  adminEmail: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  authenticated: boolean;
  message: string;
  admin: AdminProfile;
}

export const loginAdmin = async (data: {
  adminEmail: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/admin/login', data);
  return res.data;
};

export const logoutAdmin = async (): Promise<void> => {
  await api.post('/admin/logout');
};

export const getProfile = async (): Promise<{ admin: AdminProfile; authenticated: boolean }> => {
  const res = await api.get('/admin/profile');
  return res.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const res = await api.patch('/admin/change-password', data);
  return res.data;
};
