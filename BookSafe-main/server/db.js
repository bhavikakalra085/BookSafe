require("dotenv").config();

const mysql = require("mysql2/promise");

const hasDbConfig = process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME;

if (hasDbConfig) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  module.exports = pool;

} else {
  // Fallback in-memory pool for local development when no .env DB is configured.
  // Provides minimal API used by the server: query() and getConnection().
  const seats = [];

  // initialize 30 seats if empty
  for (let i = 1; i <= 30; i++) seats.push({ id: i, is_booked: false });

  const pool = {
      query: async (sql, params) => {
        const norm = String(sql).replace(/\s+/g, " ").trim().toUpperCase();
        console.log('[FALLBACK DB] query:', norm, 'params:', params);

        // SELECT * FROM seats WHERE id = ? (with optional FOR UPDATE)
        if (norm.includes("FROM SEATS") && norm.includes("WHERE ID")) {
          const id = params && params[0];
          const rows = seats.filter((x) => x.id == id);
          return [rows];
        }

        // SELECT * FROM seats
        if (norm === "SELECT * FROM SEATS") {
          return [seats.map((r) => ({ ...r }))];
        }

        // UPDATE seats SET is_booked = TRUE/FALSE WHERE id = ?
        if (norm.startsWith("UPDATE SEATS SET IS_BOOKED")) {
          const id = params && params[0];
          const seat = seats.find((x) => x.id == id);
          if (seat) {
            // determine target value by inspecting SQL
            const setTrue = /IS_BOOKED\s*=\s*TRUE/i.test(sql);
            seat.is_booked = !!setTrue;
            return [{ affectedRows: 1 }];
          }
          return [{ affectedRows: 0 }];
        }

        // default empty result
        return [[]];
    },
    getConnection: async () => {
      // simple connection wrapper that supports transaction methods used by server
      return {
        beginTransaction: async () => {},
        query: async (sql, params) => pool.query(sql, params),
        commit: async () => {},
        rollback: async () => {},
        release: () => {},
      };
    },
  };

  module.exports = pool;
}