export const isDev: boolean = process.env.NODE_ENV !== "production";
export const appPort: number = Number(process.env.PORT) || 8080;
