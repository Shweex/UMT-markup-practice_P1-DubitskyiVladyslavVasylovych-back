# Flora Backend

REST API для проєкту Flora (UMT). Express + PostgreSQL + Sequelize + Joi + Multer + Swagger.

**Frontend:** https://github.com/Shweex/UMT-markup-practice_P1-DubitskyiVladyslavVasylovych  
**Backend repo:** https://github.com/Shweex/UMT-markup-practice_P1-DubitskyiVladyslavVasylovych-back

## Стек

- Node.js (LTS)
- Express
- PostgreSQL + Sequelize
- Joi (валідація)
- Multer (завантаження фото)
- Swagger UI (`/api-docs`)

## Структура

```
server.js              — точка запуску
configs/               — підключення до БД
models/                — Sequelize-моделі
routes/                — маршрути
controllers/           — HTTP-шар
services/              — бізнес-логіка
schemas/               — Joi-схеми
middleware/            — validateBody, upload, errorHandler
helpers/               — HttpError, gravatar, formatBouquet
docs/swagger.json      — OpenAPI-документація
public/photos/         — постійні фото
temp/                  — тимчасові файли Multer
```

## Локальний запуск

1. Скопіюй `.env.example` → `.env` і заповни `DATABASE_URL`.
2. Встанови залежності:

```bash
npm install
```

3. Запусти сервер:

```bash
npm start
```

4. (Опційно) Заповни БД тестовими даними локально:

```bash
npm run seed
```

На Render Free Shell недоступний — при першому запуску сервер **автоматично** додає 4 тестові букети, якщо база порожня.

5. Відкрий Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API endpoints

| Method | Endpoint | Опис |
|--------|----------|------|
| GET | `/api/bouquets` | Список усіх букетів |
| GET | `/api/bouquets/:id` | Один букет |
| POST | `/api/bouquets` | Створення (Joi) |
| PUT | `/api/bouquets/:id` | Оновлення |
| DELETE | `/api/bouquets/:id` | Видалення |
| PATCH | `/api/bouquets/:id/favorite` | Оновлення `favorite` |
| PATCH | `/api/bouquets/:id/photo` | Завантаження фото (`multipart/form-data`, поле `photo`) |

## Модель Bouquet

| Поле | Тип |
|------|-----|
| `id` | integer (auto) |
| `photoURL` | string |
| `title` | string |
| `description` | string |
| `price` | decimal |
| `favorite` | boolean |

При створенні `photoURL` генерується через Gravatar. Фото оновлюється через PATCH `/photo`.

## Деплой на Render

1. Створи **PostgreSQL** на [Render](https://render.com).
2. Створи **Web Service** з цього репозиторію.
3. Environment variables:
   - `DATABASE_URL` — Internal Database URL
   - `DB_SSL=true`
   - `APP_URL` — публічний URL сервісу (наприклад `https://flora-api.onrender.com`)
   - `PORT=10000` (Render часто використовує 10000)
4. Build command: `npm install`
5. Start command: `npm start`
6. Після деплою букети з’являться автоматично при першому запуску (якщо база порожня). Shell не потрібен.

## Змінні середовища

| Variable | Опис |
|----------|------|
| `PORT` | Порт сервера |
| `DATABASE_URL` | PostgreSQL connection string |
| `DB_SSL` | `true` для Render |
| `APP_URL` | Публічний URL backend (для photoURL) |
