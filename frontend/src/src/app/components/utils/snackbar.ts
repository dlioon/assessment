import { toast } from 'react-toastify';
import { Id } from 'react-toastify/dist/types';

export const success = (message: string): Id => toast.success(message);

export const error = (message: string): Id => toast.error(message);
