export interface Pagination<T> {
  count: number;
  total: number;
  page: number;
  pageCount: number;
  data: T[];
}

export interface ApiValidationErrorMessage {
  field: string;
  message: string;
  constraint: string;
}

export interface ApiError {
  statusCode: number;
  message: ApiValidationErrorMessage[] | string;
  error: string;
}
