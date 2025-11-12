const { Pool } = require('pg');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL; // e.g. from Neon/Supabase/Render Postgres

if (!DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Please configure Postgres connection string.');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false }
});

async function initializeDatabase() {
  // Create tables if not exists (Postgres syntax)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      postcode TEXT,
      street_address TEXT,
      country TEXT,
      city TEXT,
      state_province TEXT,
      dob TEXT,
      email TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

initializeDatabase().catch((err) => {
  console.error('Failed to initialize database:', err);
});

const db = {
  query: (text, params) => pool.query(text, params)
};

module.exports = db;

