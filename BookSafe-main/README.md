# BookSafe

A full-stack seat reservation system built to explore database concurrency, transaction safety, and serverless deployment.

## Live Demo

- Frontend + API deployed on Vercel: https://booksafe-fullstack.vercel.app

## Why I Built This

Booking systems seem simple until multiple users try to reserve the same seat at the same time. BookSafe demonstrates how to handle race conditions, enforce consistency, and recover safely when bookings fail.

## Features

- Interactive seat selection UI
- Book and cancel reservations
- Transaction-based booking workflow with row-level locking
- Serverless backend deployed on Vercel
- Local backend fallback to in-memory data when MySQL is not configured

## Tech Stack

- React + Vite
- Node.js + Express
- MySQL / in-memory fallback
- Vercel serverless functions

## Local Setup

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Then open the local Vite app in the browser.

### Full Build

From the repository root:

```bash
npm run build
```

This runs the client build and produces the production-ready assets.

## API Endpoints

- `GET /api/seats` — fetch all seats
- `POST /api/seats/:id/book` — book a seat
- `POST /api/seats/:id/cancel` — cancel a booking

## Concurrency Test

Verify lock-based booking protection with:

```bash
cd server
node concurrency-test.js
```

## Notes

- The backend uses `server/db.js` to connect to MySQL when environment variables are set.
- If no MySQL config is provided, the app falls back to an in-memory seat store for local development.

---


