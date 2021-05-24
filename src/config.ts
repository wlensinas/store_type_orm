import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const variables = {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    sqlserver: {
      dbName: process.env.SQLSERVER_DATABASE,
      port: parseInt(process.env.SQLSERVER_PORT),
      password: process.env.SQLSERVER_SA_PASSWORD,
      user: process.env.SQLSERVER_USER,
      host: process.env.SQLSERVER_HOST,
    },
    apiKey: process.env.API_KEY,
  };
  return variables;
});
