module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [
    "api/dist/database/migrations/**.js"
  ]
};
