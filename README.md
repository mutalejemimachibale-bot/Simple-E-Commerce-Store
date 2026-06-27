# Link&Style - E-Commerce Platform

A vibrant, full-featured e-commerce platform built with React, Vite, and TailwindCSS. Shop smart, live stylish with our curated collection of Electronics, Clothing, and Books.

## Features

### Module 1: Product Catalog
- **Product Display**: Grid layout showcasing product image, name, price, and description
- **Search Function**: Keyword search filtering products by name
- **Dual Filters**: Category filter (Electronics/Clothing/Books) + Price range slider
- **Pagination**: 10 products per page with navigation controls
- **Client-side Validation**: Search queries sanitized, price range validated

### Module 2: Shopping Cart
- **Add to Cart**: One-click add with quantity selector
- **Cart Operations**: Update quantity, remove single item, clear entire cart
- **Price Calculations**: Subtotal, 10% tax, and final total auto-calculated
- **Persistence**: Cart data stored in localStorage across browser sessions
- **Cart Isolation**: Separate carts per user session/guest browser

### Module 3: Checkout Flow
- **Shipping Form**: Name, email, address, phone fields with client validation
- **Email Validation**: RFC-compliant email format checking
- **Delivery Selector**: Standard (5-7 days) / Express (1-2 days) options
- **Order Summary**: Preview of items, quantities, totals before submission
- **Order ID Generation**: Unique timestamp-based order ID on submit
- **Confirmation Page**: Display order details with Cash on Delivery badge

### Module 4: User Account
- **Registration**: Name, email, password with validation
- **Login**: Email/password authentication
- **Order History**: Dashboard showing past orders with status
- **Guest Checkout**: Complete purchase without account creation

### Module 5: Admin Panel
- **Product CRUD**: Add, Edit, Delete products with form validation
- **Order Management**: Full view of all orders with details
- **Status Updates**: Pending → Shipped → Delivered workflow
- **Access Control**: Admin-only routes protected by role check

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 18.2.0 |
| Build Tool | Vite | 5.1.4 |
| Routing | React Router DOM | 6.22.0 |
| Styling | TailwindCSS | 3.4.1 |
| State Management | Zustand | 4.5.0 |
| Icons | Lucide React | 0.344.0 |
| Language | TypeScript | 5.2.2 |

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── CartItemCard.tsx  # Individual cart item display
│   ├── FilterSidebar.tsx # Category and price filters
│   ├── Footer.tsx        # Site footer
│   ├── Navbar.tsx        # Navigation header
│   ├── Pagination.tsx    # Page navigation
│   ├── ProductCard.tsx   # Product display card
│   └── ProtectedRoute.tsx # Route protection
├── data/
│   └── products.ts       # Initial product dataset (36 products)
├── pages/
│   ├── admin/            # Admin panel pages
│   │   ├── AddProduct.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminOrders.tsx
│   │   ├── AdminProducts.tsx
│   │   └── EditProduct.tsx
│   ├── AccountPage.tsx   # User account dashboard
│   ├── CartPage.tsx      # Shopping cart
│   ├── CheckoutPage.tsx  # Checkout flow
│   ├── ConfirmationPage.tsx # Order confirmation
│   ├── HomePage.tsx      # Product catalog
│   ├── LoginPage.tsx     # Login form
│   ├── OrderHistory.tsx  # User order history
│   ├── ProductDetail.tsx # Product detail page
│   └── RegisterPage.tsx  # Registration form
├── stores/               # Zustand state management
│   ├── authStore.ts      # Authentication state
│   ├── cartStore.ts      # Shopping cart state
│   ├── orderStore.ts     # Order management state
│   └── productStore.ts   # Product catalog state
├── types.ts              # TypeScript interfaces
├── App.tsx               # Root component with routes
├── main.tsx              # Application entry point
└── index.css             # Global styles and animations
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Access Credentials

**Admin Account:**
- Email: `admin@linkstyle.com`
- Password: `admin123`

**Demo Customer Account:**
- Register a new account or checkout as guest

## Design System

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Primary | `#FF6B6B` (Coral Red) | Buttons, accents, highlights |
| Secondary | `#4ECDC4` (Teal) | Secondary buttons, borders |
| Accent | `#FFE66D` (Sunny Yellow) | Category badges, highlights |
| Background | `#FAFAFA` (Off-white) | Page backgrounds |
| Text Primary | `#2D3436` (Charcoal) | Headings, body text |
| Text Secondary | `#636E72` (Gray) | Secondary text, labels |
| Success | `#00B894` (Mint) | Success states |
| Warning | `#FDCB6E` (Amber) | Warning states |
| Error | `#E17055` (Burnt Orange) | Error states |

### Typography

- **Display Font**: Poppins (700, 600 weights) - Bold headers
- **Body Font**: Nunito (400, 600 weights) - Readable body text

## Data Models

### Product

```typescript
interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Clothing' | 'Books';
  price: number;
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Hashed
  role: 'Customer' | 'Admin';
  createdAt: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  userId: string | null;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: 'Standard' | 'Express';
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}
```

## Security

- **XSS Prevention**: HTML entities escaped in all user inputs
- **Password Hashing**: SHA-256 hashing for stored passwords
- **Role-based Access**: Admin routes protected by role verification
- **Cart Isolation**: localStorage keys include session/user ID prefix

## License

MIT License
