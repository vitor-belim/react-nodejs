export default interface ApiErrorResponse {
  status: boolean;
  message: string;
  error?: ApiError;
}

interface ApiError {
  name: string;
  message: string;
  stack?: string;
}
