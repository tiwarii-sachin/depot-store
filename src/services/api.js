// ---------------------------------------------------------------------------
// API SERVICE LAYER
// ---------------------------------------------------------------------------
// This is the ONLY file that talks to the backend. Every page/component calls
// functions from here instead of using fetch() directly. That means once you
// build your backend + database, you only have to change this one file.
//
// HOW TO SWITCH TO YOUR REAL BACKEND:
//   1. Create a .env file (see .env.example) and set:
//        VITE_API_BASE_URL=http://localhost:4000/api
//   2. That's it. Every function below will automatically start hitting your
//      real endpoints instead of the mock data, AS LONG AS your backend
//      matches the request/response shapes documented below (see README.md
//      for the full API contract + suggested DB schema).
// ---------------------------------------------------------------------------

import { PRODUCTS } from "../data/mockProducts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // undefined -> use mock data
const USE_MOCK = !BASE_URL;
const MOCK_DELAY = 350; // ms, simulates network latency so loading states are visible

function delay(ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getToken() {
  return localStorage.getItem("depot_token");
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return data;
}

// ---------------------------------------------------------------------------
// PRODUCTS
// GET /api/products              -> Product[]
// GET /api/products/:id          -> Product
// ---------------------------------------------------------------------------

export async function getProducts() {
  if (USE_MOCK) {
    await delay();
    return [...PRODUCTS];
  }
  return request("/products");
}

export async function getProductById(id) {
  if (USE_MOCK) {
    await delay();
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
  return request(`/products/${id}`);
}

// ---------------------------------------------------------------------------
// AUTH
// POST /api/auth/register  { name, email, password }   -> { user, token }
// POST /api/auth/login     { email, password }          -> { user, token }
// GET  /api/auth/me        (auth header)                -> { user }
// ---------------------------------------------------------------------------

export async function registerUser({ name, email, password }) {
  if (USE_MOCK) {
    await delay();
    const user = { id: "usr_" + Date.now(), name, email };
    const token = "mock_token_" + Date.now();
    localStorage.setItem("depot_token", token);
    localStorage.setItem("depot_user", JSON.stringify(user));
    return { user, token };
  }
  const data = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  localStorage.setItem("depot_token", data.token);
  localStorage.setItem("depot_user", JSON.stringify(data.user));
  return data;
}

export async function loginUser({ email, password }) {
  if (USE_MOCK) {
    await delay();
    if (!email || !password) throw new Error("Email and password are required");
    const user = { id: "usr_mock", name: email.split("@")[0], email };
    const token = "mock_token_" + Date.now();
    localStorage.setItem("depot_token", token);
    localStorage.setItem("depot_user", JSON.stringify(user));
    return { user, token };
  }
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("depot_token", data.token);
  localStorage.setItem("depot_user", JSON.stringify(data.user));
  return data;
}

export function logoutUser() {
  localStorage.removeItem("depot_token");
  localStorage.removeItem("depot_user");
}

export function getStoredUser() {
  const raw = localStorage.getItem("depot_user");
  return raw ? JSON.parse(raw) : null;
}

// ---------------------------------------------------------------------------
// ORDERS
// POST /api/orders   { items, shipping, total }  (auth header)  -> Order
// GET  /api/orders                                (auth header) -> Order[]
// ---------------------------------------------------------------------------

export async function placeOrder({ items, shipping, total }) {
  if (USE_MOCK) {
    await delay(600);
    const order = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      items,
      shipping,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("depot_orders") || "[]");
    localStorage.setItem("depot_orders", JSON.stringify([order, ...existing]));
    return order;
  }
  return request("/orders", {
    method: "POST",
    body: JSON.stringify({ items, shipping, total }),
  });
}

export async function getOrders() {
  if (USE_MOCK) {
    await delay();
    return JSON.parse(localStorage.getItem("depot_orders") || "[]");
  }
  return request("/orders");
}
