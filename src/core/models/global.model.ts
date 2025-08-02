export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}

export type NotificationType = 'success' | 'error' | 'warning';
