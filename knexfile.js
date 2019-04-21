require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
};
