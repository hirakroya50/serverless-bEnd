export const createErrorResponse = (status: number, message: string) => ({
  status,
  error: message,
});
