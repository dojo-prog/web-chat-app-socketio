import "dotenv/config";

const ENV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET,
};

export { ENV };
