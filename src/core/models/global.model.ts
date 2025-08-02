export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type NotificationType = 'success' | 'error' | 'warning';
