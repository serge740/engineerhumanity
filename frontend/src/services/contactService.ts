// @ts-ignore — api.js has no type declarations
import api from '../api/api';

interface ContactPayload {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
}

export const sendContactMessage = async (data: ContactPayload, file?: File): Promise<void> => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    if (file) {
        formData.append('attachment', file);
    }
    // Pass FormData — axios + browser will set Content-Type with correct multipart boundary
    await api.post('/api/contact', formData, {
        headers: { 'Content-Type': undefined },
    });
};
