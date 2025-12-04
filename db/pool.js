const { Pool } = require('pg');

// Only load .env locally, not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // fallback for local dev
  connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;