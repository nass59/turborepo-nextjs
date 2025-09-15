import type { AxiosError } from 'axios';
import { toast } from 'sonner';

type ErrorResponse = {
  message: string;
};

export const toastError = (error: unknown, defaultMessage: string) => {
  const axiosError = error as AxiosError<ErrorResponse>;
  const errorMessage = axiosError.response?.data?.message || defaultMessage;

  toast('Something went wrong.', {
    description: errorMessage,
  });
};
