import dotenv from 'dotenv'
import type { Config, Environment } from '../Types/config.d.ts'

dotenv.config();

const _config: Config = {
    PORT: Number(process.env.PORT) || 8000,
    APP_URL: process.env.APP_URL? `${process.env.APP_URL}:${process.env.PORT || 8000}`:`http://localhost:${process.env.PORT || 8000}`,
    nodeEnv: (process.env.NODE_ENV as Environment) || "development",
    DATABASE_URL: process.env.DATABASE_URL as string,
};

export const config: Config = Object.freeze(_config);