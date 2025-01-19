export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  status: number;
  data: T;
}

// export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// export interface ApiSuccessResponse<T> {
//   success: true;
//   message: string;
//   status: number;
//   data: T;
// }

// export interface ApiErrorResponse {
//   success: false;
//   message: string;
//   status: number;
//   errorDetails: ErrorDetails;
// }

// export interface ErrorDetails {
//   errorName: string;
//   errors: ValidationError[];
//   errorUri: string;
//   httpMethod: string;
//   timestamp: string;
// }

// export interface ValidationError {
//   field: string;
//   message: string;
// }
