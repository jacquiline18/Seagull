# SEAGULL GENERAL SUPPLY LIMITED
### *"Services Beyond Measure!"*

A full-stack, production-ready MERN-architecture web application and digital scientific catalogue for **Seagull General Supply Limited**, the premier supplier of chemistry laboratory apparatus, scientific instruments, glassware, measuring devices, safety gear, and laboratory consumables across all regions of Tanzania.

---

## 🌟 Brand Identity & Company Information

- **Company Name:** Seagull General Supply Limited
- **Tagline:** *"Services Beyond Measure!"*
- **Phone:** `+255 (0) 743 611 101`
- **Email:** `seagull.tech20@gmail.com`
- **Website:** `www.seagull.co.tz`
- **Instagram:** `@Seagull5816`
- **Location:** Dar es Salaam, Tanzania

---

## 🔬 Key Features & Capabilities

1. **Animated Scientific Intro Page (`/intro`):**
   - High-impact molecular canvas simulation with interactive nodes & connections.
   - Animated Seagull brand emblem reveal and tagline showcase.
   - Smooth navigation into the full laboratory catalogue.

2. **Home Page (`/`):**
   - Modern hero section with quick catalogue search and trust metrics.
   - 6 Interactive Laboratory Categories (Instruments, Chemistry, Measuring, Glassware, Safety, Consumables).
   - 8 Featured Equipment Cards with instant Add-to-Cart and Quick-View Modal.
   - Why Choose Us value proposition and 6 target industry sectors.
   - Call-to-action consultation banner.

3. **Complete Products Catalogue (`/products`):**
   - Real-time live search across product names, descriptions, and SKUs.
   - Category filtering chips and sidebar filter with live item counts.
   - Price range slider up to TZS 8,000,000+.
   - In-stock availability toggle.
   - Sorting options: Price (Low/High), Name (A-Z/Z-A), Rating, Featured.
   - Grid View & List View responsive toggle.

4. **Product Details Page (`/products/:id`):**
   - High-resolution photography with stock status and featured badges.
   - Technical specifications data table (Accuracy, Capacity, Voltage, Dimensions).
   - Quantity selector & instant Add to Cart.
   - Proforma invoice and quotation request integration.
   - Printable Technical Datasheet export.
   - Related laboratory equipment recommendations.

5. **Shopping Cart (`/cart`):**
   - Item list with quantity steppers (+ / -) and animated item removal.
   - Real-time subtotal in Tanzanian Shillings (TZS).
   - Persistent storage across sessions via `localStorage`.
   - Free quote calculation and VAT/TIN invoice notes.

6. **Checkout & Institutional Order Request (`/checkout`):**
   - Comprehensive two-column order request form.
   - Fields: Customer Name, Official Email, Phone/WhatsApp, Institution/Company, Delivery Address, Notes.
   - Connects to backend `POST /api/orders` (with resilient offline fallback).
   - Confirmation screen with unique Order Reference ID and WhatsApp direct link.

7. **About Us Page (`/about`):**
   - Corporate overview, Mission, Vision, and Core Pillars of Excellence.
   - Quality control standards and ISO/DIN compliance.

8. **Contact Page (`/contact`):**
   - Direct communication cards: Phone, Email, Website, Instagram.
   - Dynamic message submission form with instant feedback.
   - Interactive FAQ accordion for procurement, regional delivery, and warranties.

9. **Admin System (`/admin/*`):**
   - **Admin Login (`/admin/login`):** JWT authentication with 1-click demo login helper.
   - **Admin Dashboard (`/admin/dashboard`):** 4 KPI metric cards (Total Products, Total Orders, Pending Orders, Quotation Pipeline) + recent orders table.
   - **Admin Products (`/admin/products`):** Full CRUD (Create, Read, Update, Delete) + image URL preview, category selector, stock units, and featured toggle.
   - **Admin Orders (`/admin/orders`):** Order inspection modal, status pipeline updater (*Pending -> Confirmed -> Processing -> Completed -> Cancelled*).

---

## 🛠️ Technology Stack

### Frontend (`client/`)
- **React 18** + **Vite**
- **React Router v6** (13 dedicated routes)
- **Modern CSS Design System** (Variables, glassmorphism, responsive grids, glow effects)
- **Framer Motion** for smooth transitions and hover micro-animations
- **Lucide React** for scientific iconography
- **Axios** for API requests (with automatic fallback to local storage)

### Backend (`server/`)
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT (JSON Web Tokens)** for protected admin endpoints
- **bcryptjs** for password hashing
- **CORS** enabled

---

## 🚀 How to Run the Application

### 1. Frontend Client
```bash
cd client
npm install
npm run dev
```
The client will start at: `http://localhost:3000`

### 2. Backend Server
```bash
cd server
npm install
npm run dev
# Or start in production mode:
npm start
```
The server will start at: `http://localhost:5000`

### 3. Seed Database (Optional)
To populate MongoDB with the initial Admin user and 16+ laboratory products:
```bash
cd server
npm run seed
```

---

## 🔑 Demo Admin Credentials

- **Email:** `admin@seagull.co.tz`
- **Password:** `admin123`

---

## 📡 REST API Structure

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/login` | Staff / Admin Login | Public |
| `POST` | `/api/auth/register` | Register New User | Private (Admin) |
| `GET` | `/api/auth/me` | Current Session User | Private |
| `GET` | `/api/products` | Get All Products (Filter/Search) | Public |
| `GET` | `/api/products/:id` | Get Single Product Details | Public |
| `POST` | `/api/products` | Create Laboratory Product | Private (Admin) |
| `PUT` | `/api/products/:id` | Update Product | Private (Admin) |
| `DELETE` | `/api/products/:id` | Delete Product | Private (Admin) |
| `POST` | `/api/orders` | Submit Order Request | Public |
| `GET` | `/api/orders` | Get All Orders | Private (Admin) |
| `GET` | `/api/orders/:id` | Get Order By ID | Private (Admin) |
| `PUT` | `/api/orders/:id` | Update Order Status | Private (Admin) |
| `POST` | `/api/contact` | Submit Contact Inquiry / Quote | Public |
| `GET` | `/api/contact` | Get Contact Messages | Private (Admin) |
| `GET` | `/api/health` | API Health & Status Check | Public |
