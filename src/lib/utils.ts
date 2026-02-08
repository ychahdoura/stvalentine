const BASE_PATH = process.env.NODE_ENV === "production" ? "/stvalentine" : "";

export function getAssetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
