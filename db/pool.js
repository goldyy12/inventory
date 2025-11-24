const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.DATABASE_URL) {
    // Cloud deployment (Render, Railway, etc.)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // needed for cloud Postgres
        },
    });
} else {
    // Local development
    pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
}

module.exports = pool;
