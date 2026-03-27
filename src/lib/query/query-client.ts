export interface QueryState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export function createInitialQueryState<T>(): QueryState<T> {
  return {
    data: null,
    error: null,
    isLoading: true,
  };
}
