# BookSafe

A full-stack seat reservation system built to explore database concurrency and transaction management.

## Why I Built This

Booking systems seem simple until multiple users try to reserve the same seat at the same time. I built BookSafe to understand how real-world applications handle race conditions and maintain data consistency under concurrent requests.

## Features

- Interactive seat selection
- Book and cancel reservations
- Transaction-based booking workflow
- Protection against double booking using row-level locks

## Tech Stack

- React + Vite
- Node.js + Express
- MySQL

## Concurrency Control

Bookings are processed inside a MySQL transaction using `SELECT ... FOR UPDATE`. The requested seat is locked during the transaction, ensuring that only one reservation can succeed even when multiple requests arrive simultaneously.

## Run Locally

### Backend

```bash
cd server
npm install
npm start
```

### Concurrency Test

There is a small test script at `server/concurrency-test.js` which fires concurrent booking requests to verify the lock-based protection:

```bash
node server/concurrency-test.js
```

## Lessons Learned

This project helped me understand that backend reliability is often more important than UI complexity. Working with transactions, row-level locking, and rollback mechanisms gave me practical experience in handling concurrency problems that occur in real reservation systems.

---

If you'd like, I can also add CI, tests, or a Docker Compose setup to make the development environment reproducible — ask me to proceed and I'll add that next.
