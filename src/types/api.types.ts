export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };

export type JsonObject = {
  [key: string]: JsonValue;
};

export interface ApiErrorPayload {
  message: string;
  status?: number;
  details?: unknown;
}

export interface ApiListMeta {
  total?: number;
  page?: number;
  pageSize?: number;
  [key: string]: unknown;
}

export interface ApiCollectionResponse<T> {
  data?: T[];
  items?: T[];
  results?: T[];
  meta?: ApiListMeta;
  pagination?: ApiListMeta;
  total?: number;
}

export interface ApiEntityResponse<T> {
  data?: T;
  item?: T;
  result?: T;
}
