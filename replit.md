# Overview

Plattr is a Bangalore-based catering and bulk meal service web application enabling customers to order from Tiffins, Snacks, and Lunch & Dinner categories. It features a mobile-first design inspired by leading food delivery apps, focusing on visual appeal and a seamless ordering experience. The project aims to provide a robust, scalable, and user-friendly platform for meal services, expanding to both web and mobile platforms.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

**Oct 27, 2025**: Removed CartDrawer from user flow - direct platter visualization
- **Cart Flow Simplification**: Completely removed "Your Order" cart drawer sheet from the application
- FloatingCartButton and cart icon now open PlatterVisualization directly (no intermediate drawer)
- CartDrawer component removed from CategoryPage, HomePage, ProfilePage, and DishesPage
- Cleaner, more streamlined user experience - users go straight from cart button to platter view
- Pax count selector only available in PlatterVisualization (not in removed CartDrawer)
- Cart icon in AppHeader opens PlatterVisualization in CategoryPage
- User flow: Add items → Click cart → See platter visualization → Proceed to checkout

**Oct 27, 2025** (earlier): Pax count selector in platter visualization
- **Pax Count Selector**: Added interactive pax count selector to PlatterVisualization component only
- Selector features: number input, +/- buttons (increment by 10), and slider (range: 10-500 pax)
- Pax count state managed in CategoryPage and passed to PlatterVisualization
- PlatterVisualization displays real-time pax count in summary line
- Pax count selector positioned prominently below the progress bar in platter view
- Selector uses white card background with border for visibility against gradient background
- All inputs include proper data-testid attributes for testing
- PlatterVisualization props: `paxCount`, `onPaxCountChange` for bidirectional state management

**Oct 27, 2025** (earlier): Guest checkout, order details, and 8-digit Order ID system
- **Guest Checkout Access**: Full guest checkout without login requirement
- Guests can fill checkout form and click "Place Order" to complete the flow
- Guest orders show thank you message and confirmation page (order not saved to database)
- Authenticated users get full order creation with order tracking
- **8-Digit Order ID System**: Implemented sequential order numbers starting from 10000001
- Added `order_number` column to orders table (unique, auto-incrementing)
- Order confirmation page displays prominent Order ID for authenticated users (e.g., #10000001)
- Backend generates next sequential order number on each authenticated order
- Order number passed to confirmation page via query parameter
- **Order Details Page**: Created comprehensive order details page showing order items, delivery schedule, address, and bill breakdown
- OrdersPage "View Details" button navigates to `/orders/:orderId` route
- Added `GET /api/orders/:orderId` endpoint to fetch order with items, address, and delivery information

**Oct 27, 2025** (even earlier): Enhanced checkout flow implementation
- Added delivery date and time selection to checkout page
- Created order confirmation page with "team will contact within 5 minutes" message
- Added POST /api/orders endpoint to create orders with delivery scheduling
- Updated orders schema with `delivery_date` and `delivery_time` fields
- Order placement now clears cart automatically for authenticated users
- **Cart to Platter to Checkout Flow**: Cart "Proceed to Checkout" opens platter visualization, then platter's "Proceed to Checkout" navigates to checkout page
- CartDrawer integrates PlatterVisualization component as intermediate step before checkout

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite.
**Routing**: wouter for lightweight routing.
**State Management**: @tanstack/react-query for server state; local React state for UI.
**UI Components**: shadcn/ui built on Radix UI primitives, customizable via `client/src/components/ui/`.
**Styling**: Tailwind CSS with custom design tokens, emphasizing food-appetizing colors. Typography uses Inter and Poppins.
**Design Philosophy**: Mobile-first responsive design with thumb-friendly interactions, bottom navigation for mobile, and visual emphasis on food imagery.

## Backend Architecture

**Framework**: Express.js with TypeScript on Node.js.
**API Design**: RESTful API for categories, dishes, cart management, and authentication.
**Database Layer**: Drizzle ORM for type-safe PostgreSQL queries.
**Authentication**: Mobile OTP-based signup/login system using Bulk SMS service. Users sign up with username and phone number, verify via 6-digit OTP sent to their mobile.
**Session Management**: Secure session-based authentication using express-session with connect-pg-simple for PostgreSQL-backed session storage. Sessions persist user ID and phone number, secured with httpOnly cookies and SameSite attribute for CSRF protection.
**Security**: All cart and payment endpoints use server-side session authentication (req.session.userId). CORS restricted to same-origin only. No client-controlled user IDs anywhere in the system.
**Error Handling**: Centralized middleware for HTTP status codes and JSON error messages.

## Data Storage

**Database**: PostgreSQL via Supabase (Production).
**Connection Strategy**: Connected to production Supabase database using `SUPABASE_DATABASE_URL` secret.
**Schema Design**: Located in `shared/schema.ts`, includes `users`, `categories`, `dishes`, `addresses`, `orders`, `cartItems`, and `otpVerifications`. `meal_type` is stored as a text array in the `dishes` table for dynamic categorization.
**Schema Relationships**: Dishes belong to categories; Orders belong to users and addresses; Addresses belong to users; Cart items belong to users and dishes; OTP verifications linked to phone numbers.
**Production Schema Compatibility**: Production database uses "breakfast", "snacks", "lunch-dinner" in `meal_type` arrays. Backend automatically maps "tiffins" → "breakfast" for API queries to maintain frontend URL compatibility.
**Recent Schema Updates**: 
- Added `order_number` column to `orders` table (Oct 27, 2025) - unique, sequential 8-digit ID starting from 10000001
- Added `is_verified` column to `users` table and created `otp_verifications` table in Supabase production database (Oct 26, 2025) to support OTP authentication feature

## API Routes

**Authentication Routes** (`/api/auth/...`):
- `POST /api/auth/check-phone`: Check if phone number exists, returns user data if found
- `POST /api/auth/send-otp`: Send OTP to phone number via Bulk SMS service (returns OTP in development mode)
- `POST /api/auth/verify-otp`: Verify OTP and create/login user, returns user data and creates session

**Category & Dish Routes**:
- `GET /api/categories/:mealType`: Get categories for a meal type (tiffins/snacks/lunch-dinner)
- `GET /api/dishes/:mealType/:category`: Get dishes by meal type and category
- `GET /api/dish-types/:category`: Get unique dish types for a category

**Cart Routes** (supports both guest and authenticated users):
- `GET /api/cart`: Returns authenticated user's cart items or empty array for guests (frontend uses localStorage for guest carts)
- `POST /api/cart`: Adds to authenticated user's cart or returns success for guests (frontend handles localStorage)
- `PUT /api/cart/:id`: Updates cart item for authenticated users or returns success for guests
- `DELETE /api/cart/:id`: Removes from authenticated user's cart or returns success for guests

**Order Routes** (session-authenticated):
- `GET /api/orders/:orderId`: Fetch single order with full details (items, address, delivery schedule, bill breakdown)
- `POST /api/orders`: Create order with delivery scheduling (requires login, generates unique 8-digit order number, clears cart after order placement, returns order ID and order number)

**Payment Routes** (session-authenticated):
- `POST /api/create-payment-intent`: Create Stripe payment intent (amount calculated server-side from authenticated user's cart)

## System Design Choices

- **Meal Type Array**: `meal_type` field in dishes is a text array, allowing a dish to belong to multiple categories (e.g., a dish can be tagged with ["breakfast", "snacks"]).
- **Meal Type URL Mapping**: Frontend uses "tiffins" in URLs while production database uses "breakfast". Backend route handler (`server/routes.ts`) automatically maps "tiffins" → "breakfast" for database queries, maintaining SEO-friendly URLs while matching production data structure.
- **Dynamic Categories**: API fetches categories dynamically based on `meal_type`, allowing flexible menu presentation across Tiffins (breakfast), Snacks, and Lunch & Dinner meal types.
- **Production Database**: Currently connected to live Supabase production database containing 42+ beverages and full dish catalog.
- **Service Type Selection**: Provides three distinct service types (Hot Bulk Food Delivery, Catering Service, Individual Meal Boxes) with detailed info modals.
- **Platter Visualization**: Full-screen, mobile-optimized visualization with dynamic progress, enhanced section indicators (pulsing glow for empty, pill badges for filled), and achievement badges.
- **Dietary Filter**: Icon-only toggle for Veg/Non-Veg/All dishes.
- **Supabase Image Integration**: Helper functions load dish images from Supabase Storage (`https://leltckltotobsibixhqo.supabase.co/storage/v1/object/public/dish_images/`) with smart fallback to local assets then a placeholder.
- **Guest Cart Support**: Cart API endpoints return empty/success responses for unauthenticated users. Frontend uses localStorage (`client/src/lib/cartStorage.ts`) to manage guest carts, allowing browsing and cart operations without login requirement. Payment still requires authentication.
- **Session-Based Security**: Authenticated cart operations derive user ID from server-side session (req.session.userId), preventing client manipulation. Ownership verification on cart modifications. CORS restricted to same-origin with SameSite cookies for CSRF protection.

# External Dependencies

**Payment Processing**: Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`).
**Database Service**: Neon Serverless PostgreSQL, Supabase PostgreSQL.
**Asset Management**: Static images in `attached_assets` (`stock_images`, `generated_images`).
**UI Component Library**: Radix UI primitives.
**Development Tools**: Replit-specific plugins, Drizzle Kit, ESBuild.
**Fonts**: Google Fonts (Inter, Poppins, DM Sans, Architects Daughter, Fira Code, Geist Mono).