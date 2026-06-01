import { Request } from 'express';
export interface AdminPayload {
    id: string;
    role: string;
}
export interface RequestWithAdmin extends Request {
    admin: AdminPayload;
}
