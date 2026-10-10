# Event Registration API

An Express.js and MongoDB API for listing events, creating users, registering
for events, and viewing or cancelling a user's registrations.

## Setup

1. Install Node.js 18+ and run `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB URL.
3. Start MongoDB, then run `npm run dev` for development or `npm start`.

The server listens on port `3000` by default. Set `PORT` to change it.

Events are stored in MongoDB and must already exist before users can register.
Create event documents through your database tooling; this API intentionally
only exposes event listing and detail endpoints.

## Project structure

Route modules in `src/routes` map HTTP methods and paths to handlers.
Request handling and database logic live in `src/controllers`, while Mongoose
schemas are defined in `src/models`. Route validation uses `express-validator`
and is defined in `src/middleware/validators.js`. The shared
`src/middleware/validate-request.js` checks the results before a request reaches
its controller.

For example, `POST /api/registrations` goes from
`src/routes/registrations.js` to `src/controllers/registrations-controller.js`,
which checks the user and event before saving a registration.

## Endpoints

All request and response bodies use JSON.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check API status |
| `GET` | `/api/events` | List events, ordered by date |
| `GET` | `/api/events/:eventId` | Get event details |
| `POST` | `/api/users` | Create a user (`name`, `email`) |
| `POST` | `/api/registrations` | Register (`userId`, `eventId`) |
| `GET` | `/api/users/:userId/registrations` | View registrations, including cancelled records |
| `DELETE` | `/api/users/:userId/registrations/:registrationId` | Cancel a registration |

Cancelling preserves the registration with a `cancelled` status. Posting the
same user/event pair again reactivates that record rather than creating a
duplicate.

## Authentication note

These endpoints do not authenticate users. A caller can supply any user ID,
so this setup is suitable for local development or a trusted prototype only.
Add authentication and derive the user ID from the authenticated request
before deploying it for real users.
