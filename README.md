# Test Login TS Express

API base con Express + TypeScript + TypeORM + SQLite.

## Requisitos
- Node 18+

## Instalación
```bash
npm install
```

## Variables de entorno
Copia `.env.example` a `.env` y ajusta valores si es necesario.

## Comandos
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Producción: `npm start`
- Seed (crea usuario admin): `npm run seed`

## Endpoints
- `POST /api/auth/login` { email, password }
- `GET /api/users` (requiere Bearer token)

## Estructura
```
src/
  config/
  controllers/
  entities/
  middlewares/
  routes/
  seed/
  services/
  utils/
  app.ts
  server.ts
```
