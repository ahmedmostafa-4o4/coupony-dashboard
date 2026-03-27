type SnakeToCamelCase<S extends string> =
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamelCase<Tail>>}`
    : S;

export type Camelized<T> = T extends Array<infer Item>
  ? Camelized<Item>[]
  : T extends ReadonlyArray<infer Item>
    ? ReadonlyArray<Camelized<Item>>
    : T extends object
      ? {
          [Key in keyof T as Key extends string
            ? SnakeToCamelCase<Key>
            : Key]: Camelized<T[Key]>;
        }
      : T;
