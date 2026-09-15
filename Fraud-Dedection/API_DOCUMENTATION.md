# CyberShield API

Base URL: `http://localhost:5000`

The backend requires `MONGODB_URI` at startup. Users, alerts, and cases are stored in MongoDB.

Protected endpoints require `Authorization: Bearer <token>`. Responses use `{ "success": true, "data": {} }` for success and `{ "success": false, "message": "..." }` for errors.

## Health

`GET /api/health`

Response:

```json
{ "success": true, "message": "CyberShield API is running" }
```

## Authentication

`POST /api/auth/login`

```json
{ "email": "admin@cybershield.demo", "password": "Demo@123" }
```

Returns `data.token` and `data.user`. The frontend stores the token locally for the current demo session.

`POST /api/auth/register`

```json
{ "name": "Ayan Shaikh", "company": "Acme Financial", "email": "user@example.com", "password": "at-least-8-chars", "role": "Analyst" }
```

`GET /api/auth/me` requires authentication and returns the current user.

## Workspace

`GET /api/dashboard` requires authentication and returns `alerts`, `cases`, `users`, and severity counts. The current frontend uses this response to hydrate its existing workspace tables.

`GET /api/alerts` requires authentication and returns the alert list.

`PATCH /api/alerts/:id` requires authentication.

```json
{ "status": "Resolved" }
```

Valid statuses are `Open`, `Investigating`, and `Resolved`.

## AI fraud analysis

`POST /api/ai/analyze` requires authentication. Groq is called only by the backend.

```json
{ "type": "url", "source": "https://example.test", "context": "new device and unusual location" }
```

The response is returned as `data.response` with `riskLevel`, `riskScore`, `isFraud`, `reason`, and `recommendation`. If `GROQ_API_KEY` is missing, the endpoint returns `503` so the frontend can show an unavailable-service error.
