import api from '../api/api';

interface ContactPayload {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
}

export const sendContactMessage = async (data: ContactPayload): Promise<void> => {
    await api.post('/api/contact', data);
};
