export function createAdminQueryKey(feature: string, ...parts: Array<string | number>) {
  return ["admin", feature, ...parts.map(String)] as const;
}
