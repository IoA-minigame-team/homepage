/** next.config.ts の basePath（例: "/homepage"）。<img> や <iframe> など Next が自動で付けない URL 用 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** public/ 以下のファイルへの URL を basePath 付きで返す */
export const asset = (path: string) => `${BASE_PATH}${path}`;
