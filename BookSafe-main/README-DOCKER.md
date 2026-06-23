# Local Docker development

Run the app and a local MySQL using Docker Compose:

```bash
docker compose up --build
```

Wait for the `db` service to become healthy, then seed the database:

```bash
docker compose exec server npm run seed
```

Server will be available at `http://localhost:5000` and the client can be started separately with Vite.
