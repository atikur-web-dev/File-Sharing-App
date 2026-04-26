import { Secret } from "jsonwebtoken";

export type Environment = "development" | "production" | "staging";

export type Config = {
  PORT: number;
  APP_URL: string;
  nodeEnv: Environment;
  DATABASE_URL: string;
  // jwt configuration
  ACCESS_TOKEN_SECRET_KEY: Secret;
  ACCESS_TOKEN_EXPIRE: string;
  REFRESH_TOKEN_SECRET_KEY: Secret;
  REFRESH_TOKENS_EXPIRE: string;
};
