# DEPOT — General Supply Co.

A frontend-only e-commerce site (React + Vite + Tailwind + React Router) built
so you can practice building the backend, database, and DevOps pieces
yourself. Right now it runs entirely on mock data stored in the browser
(localStorage). It's wired so that plugging in a real backend later requires
changing **one file**.

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. Nothing else needed — it works fully
standalone with mock data.

## Project structure

```
src/
  components/     Navbar, Footer, ProductCard
  context/        CartContext (cart state), AuthContext (user session)
  data/           mockProducts.js — the fake catalog
  pages/          Home, Products, ProductDetail, Cart, Checkout,
                  Orders, OrderSuccess, Login, Signup, NotFound
  services/
    api.js        <-- THE ONLY FILE THAT TALKS TO A BACKEND
```

Every page calls functions from `src/services/api.js` (`getProducts()`,
`loginUser()`, `placeOrder()`, etc.) instead of calling `fetch` directly. As
long as your backend matches the contract below, you never touch a
page/component to go from mock data to a live database.

## How to connect your own backend

1. Build your backend (Node/Express, Django, Rails, Go, whatever you want to
   practice) matching the API contract below.
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
3. Restart `npm run dev`. `api.js` automatically stops using mock data and
   starts making real `fetch()` calls to your server, including sending a
   `Authorization: Bearer <token>` header once a user is logged in.

## API contract to build against

### Products
| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/api/products` | — | `Product[]` |
| GET | `/api/products/:id` | — | `Product` |

```ts
type Product = {
  id: string;          // e.g. "DPT-1001"
  name: string;
  category: string;    // "Apparel" | "Electronics" | "Home" | "Field Gear"
  price: number;
  stock: number;
  rating: number;
  image: string;       // URL
  description: string;
};
```

### Auth
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password }` | `{ user, token }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ user, token }` |
| GET | `/api/auth/me` | — (auth header) | `{ user }` |

```ts
type User = { id: string; name: string; email: string };
```

### Orders
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/api/orders` | `{ items, shipping, total }` (auth header) | `Order` |
| GET | `/api/orders` | — (auth header) | `Order[]` |

```ts
type OrderItem = { id: string; name: string; price: number; qty: number; image: string };
type Order = {
  id: string;
  items: OrderItem[];
  shipping: { name: string; email: string; address: string; city: string; zip: string };
  total: number;
  status: string;      // "confirmed" | "shipped" | "delivered" ...
  createdAt: string;   // ISO date
};
```

Errors should be JSON with a `message` field and a non-2xx status code —
`api.js` reads `data.message` and throws it, and the UI displays it.

## Suggested database schema (for your practice)

A relational schema (Postgres/MySQL) that maps cleanly onto the contract
above:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,              -- "DPT-1001"
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  image TEXT,
  description TEXT
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,              -- "ORD-482913"
  user_id UUID REFERENCES users(id),
  shipping_name TEXT,
  shipping_email TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_zip TEXT,
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  name TEXT NOT NULL,               -- snapshot at time of purchase
  price NUMERIC(10,2) NOT NULL,     -- snapshot at time of purchase
  qty INT NOT NULL
);
```

## Suggested build order (backend + DevOps practice)

1. **API skeleton** — stand up Express/FastAPI/etc. with the routes above
   returning hardcoded JSON.
2. **Database** — add Postgres (Docker Compose is a good practice target),
   create the tables above, seed `products` from `src/data/mockProducts.js`.
3. **Auth** — real password hashing (bcrypt) + JWT issuing/verification for
   `/auth/*` and protect `/orders`.
4. **Wire it up** — set `VITE_API_BASE_URL` and confirm the frontend now
   reads/writes through your API with zero frontend code changes.
5. **Containerize** — Dockerfile for the API, `docker-compose.yml` with the
   DB, `.env` handling, health checks.
6. **CI/CD** — GitHub Actions: lint/test on PR, build + push image on merge.
7. **Deploy** — pick a target (Fly.io, Render, a VPS with nginx, AWS ECS) and
   get the full stack running behind a real domain + HTTPS.
8. **Extras to practice further**: pagination on `/products`, product search
   on the backend instead of client-side, rate limiting, refresh tokens,
   webhook-based payments (Stripe test mode), image uploads to S3-compatible
   storage.

## Notes

- Cart and mock auth/orders currently persist in `localStorage` — clear it
  via devtools or the browser's site data settings to reset.
- All product images are from Unsplash — swap for your own before deploying
  anything real.
- This is a practice project, not a production store — there's no real
  payment processing.
