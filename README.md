# Catalogue — E-Commerce Product Gallery

A browsable product gallery with category filters, search, sorting, a price range filter, a wishlist, and a shopping cart — built with React, Vite, and Tailwind CSS against the DummyJSON product API.

## Internship submission details

| Field Value
 Full Name - Prabu T.
 Domain -  frontend development .
 Intern ID -  CITS4941.
| Project Name | E-Commerce Product Gallery |
| Project Scope | A frontend-only product catalogue: browse, search, filter by category and price, sort, save items to a wishlist, and manage a shopping cart — all backed by a live public product API and persisted locally in the browser. |

## Features

- **Live product data** from [DummyJSON](https://dummyjson.com) — ~194 real-ish products across categories like beauty, furniture, electronics, and more
- **Search** with debounced input, **category chips**, a **price range filter**, and **sort** by name, price, or rating
- **Wishlist** — heart any product, filter the grid down to just your wishlist, persisted to `localStorage`
- **Quick view modal** — full description, image gallery, quantity selector, add to cart
- **Cart drawer** — line items with quantity steppers, subtotal, demo checkout, persisted to `localStorage`
- **"Load more" pagination** rather than fetching everything onto the screen at once
- Fully responsive grid (2 columns on mobile up to 4 on desktop)

## Tech stack

React 18 · Vite · Tailwind CSS · Zustand (with `persist`) · Framer Motion · Axios · Lucide icons · DummyJSON API

## Getting started

```bash
npm install
npm run dev
```

No API key required.

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Design & engineering notes

- **One fetch per filter combination.** Category and search are server-side (DummyJSON supports both natively), fetched with `limit=0` since the whole catalogue is small. Price-range filtering and "load more" are then instant, client-side operations on that result set — no juggling server pagination against client-side filters.
- **Sale price is computed, not guessed.** DummyJSON's `price` field is the original price; the displayed sale price is `price * (1 - discountPercentage / 100)`, with the original struck through when a discount applies — matching how real storefronts present price drops.
- **The discount badge is a literal price tag**, not a generic rounded pill — drawn as an SVG with a notch and a punch-hole, tying the UI detail back to a real retail object instead of a decorative shape.
- **Demo checkout only.** "Proceed to checkout" clears the cart and shows a confirmation toast — no payment is processed. A full multi-step checkout flow is a separate project.

## Screenshots

_Add 2–3 screenshots here after running the app locally — e.g. the product grid, the quick view modal, and the cart drawer open._

## Attribution

Product data and images courtesy of [DummyJSON](https://dummyjson.com).
