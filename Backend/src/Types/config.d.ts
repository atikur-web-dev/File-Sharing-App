export type Environment = "development" | "production" | "staging";

export type Config = {
    PORT: number;
    APP_URL: string;
    nodeEnv: Environment;
    DATABASE_URL: string;
}