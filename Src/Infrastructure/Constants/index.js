import { config } from "dotenv";

config();

export const PORT = process.env.PORT || process.env.APP_PORT;
export const DOMAIN = process.env.APP_DOMAIN;
export const DB = process.env.APP_DB;
export const APP_SECRET = process.env.APP_SECRET;
export const SENDGRID_APIKEY = process.env.SENDGRID_APIKEY;
export const SALT = process.env.SALT;
export const HOST_EMAIL = process.env.HOST_EMAIL;
export const HOST_EMAIL_PASSWORD = process.env.HOST_EMAIL_PASSWORD;