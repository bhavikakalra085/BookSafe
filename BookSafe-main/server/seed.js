const mysql = require('mysql2/promise');
require('dotenv').config();

const SEAT_ROWS = 'ABCDEFGHIJ'.split('');
const SEATS_PER_ROW = 16;

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'example',
  });

  const dbName = process.env.DB_NAME || 'booksafe';
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await conn.query(`USE \`${dbName}\``);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS seats (
      id INT PRIMARY KEY AUTO_INCREMENT,
      seat_number VARCHAR(16) NOT NULL,
      event_name VARCHAR(255),
      is_booked BOOLEAN DEFAULT FALSE
    )
  `);

  // clear and reseed
  await conn.query('DELETE FROM seats');

  const inserts = [];
  for (const row of SEAT_ROWS) {
    for (let n = 1; n <= SEATS_PER_ROW; n++) {
      inserts.push([`${row}${n}`, 'Concert Night', 0]);
    }
  }

  const placeholders = inserts.map(() => '(?, ?, ?)').join(',');
  const flat = inserts.flat();

  if (inserts.length) {
    await conn.query(`INSERT INTO seats (seat_number, event_name, is_booked) VALUES ${placeholders}`, flat);
  }

  console.log('Seeded', inserts.length, 'seats');
  await conn.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
