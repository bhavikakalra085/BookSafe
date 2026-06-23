const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Seat Booking Backend Running");
});

const SEAT_ROWS = 'ABCDEFGHIJ'.split('')
const SEATS_PER_ROW = 16

const computeSeatNumber = (id) => {
  const index = Number(id) - 1
  if (Number.isNaN(index) || index < 0) return `#${id}`
  const row = SEAT_ROWS[Math.floor(index / SEATS_PER_ROW)]
  const number = (index % SEATS_PER_ROW) + 1
  return row ? `${row}${number}` : `#${id}`
}

app.get("/seats", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM seats"
    );

    const normalized = rows.map((row, idx) => ({
      id: row.id ?? idx + 1,
      seat_number: row.seat_number || computeSeatNumber(row.id ?? idx + 1),
      event_name: row.event_name || 'Concert Night',
      is_booked: Boolean(row.is_booked),
    }))

    res.json(normalized);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

app.post("/seats/:id/book", async (req, res) => {

  const seatId = req.params.id;

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const [rows] = await connection.query(
      `
      SELECT *
      FROM seats
      WHERE id = ?
      FOR UPDATE
      `,
      [seatId]
    );

    if (rows.length === 0) {

      await connection.rollback();

      return res.status(404).json({
        message: "Seat not found"
      });

    }

    const seat = rows[0];

    console.log(
      `Request for seat ${seatId}, is_booked=${seat.is_booked}`
    );

    console.log(`Locked seat ${seatId}`);

    await new Promise(resolve =>
      setTimeout(resolve, 5000)
    );

    if (seat.is_booked) {

      await connection.rollback();

      return res.status(400).json({
        message: "Seat already booked"
      });

    }

    await connection.query(
      `
      UPDATE seats
      SET is_booked = TRUE
      WHERE id = ?
      `,
      [seatId]
    );

    console.log(`Booking seat ${seatId}`);

    await connection.commit();

    res.json({
      message: "Seat booked successfully"
    });

  } catch (error) {

    console.error(error);

    try {
      await connection.rollback();
    } catch {}

    res.status(500).json({
      message: "Something went wrong"
    });

  } finally {

    connection.release();

  }

});

app.post("/seats/:id/cancel", async (req, res) => {

  const seatId = req.params.id;

  try {

    const [rows] = await pool.query(
      "SELECT * FROM seats WHERE id = ?",
      [seatId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Seat not found"
      });
    }

    const seat = rows[0];

    if (!seat.is_booked) {
      return res.status(400).json({
        message: "Seat is already available"
      });
    }

    await pool.query(
      "UPDATE seats SET is_booked = FALSE WHERE id = ?",
      [seatId]
    );

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});