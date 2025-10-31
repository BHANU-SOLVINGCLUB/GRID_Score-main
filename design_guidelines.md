# Design Guidelines: Bangalore Catering & Bulk Meal Service

## Design Approach: Reference-Based (Food Delivery Apps)

**Primary References**: Zomato, Swiggy, Zepto checkout patterns combined with Uber Eats' visual treatment and Airbnb's card aesthetics

**Key Principles**: 
- Mobile-first with thumb-friendly interactions
- Visual appetite appeal through imagery
- Seamless ordering flow with minimal friction
- Trust-building through clear pricing and order transparency

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Light Mode)**:
- Brand Primary: 15 85% 55% (vibrant orange-red, food appetizing)
- Brand Secondary: 25 90% 50% (warm amber accent)
- Surface: 0 0% 98% (light background)
- Text Primary: 220 15% 20% (dark slate)
- Text Secondary: 220 10% 45% (medium gray)

**Primary Colors (Dark Mode)**:
- Brand Primary: 15 80% 60% (slightly lighter orange-red)
- Brand Secondary: 25 85% 55% (warm amber)
- Surface: 220 18% 12% (deep charcoal)
- Surface Elevated: 220 15% 18% (card background)
- Text Primary: 0 0% 95% (off-white)
- Text Secondary: 220 8% 65% (light gray)

**Semantic Colors**:
- Success: 142 70% 45% (fresh green for confirmations)
- Warning: 38 92% 50% (golden yellow)
- Error: 0 85% 60% (red for alerts)

### B. Typography

**Font Families** (Google Fonts):
- Primary: 'Inter' - clean, modern, excellent mobile readability
- Display: 'Poppins' - bold headings and CTAs
- Fallback: system-ui, sans-serif

**Type Scale**:
- Hero/Display: text-4xl md:text-5xl, font-bold (Poppins)
- Section Headings: text-2xl md:text-3xl, font-semibold (Poppins)
- Card Titles: text-lg md:text-xl, font-semibold (Inter)
- Body: text-base, font-normal (Inter)
- Caption/Helper: text-sm, font-medium (Inter)
- Price Tags: text-xl md:text-2xl, font-bold (Poppins)

### C. Layout System

**Spacing Primitives**: Use tailwind units of 3, 4, 6, 8, 12, 16
- Micro spacing: gap-3, p-3 (12px)
- Standard spacing: gap-4, p-4 (16px)
- Section padding: py-8, px-4 mobile / py-12, px-6 desktop
- Large gaps: gap-8, gap-12 for content separation

**Grid System**:
- Mobile: Single column, full-width cards with px-4 container
- Tablet: 2-column grid for dish cards (md:grid-cols-2)
- Desktop: 3-column grid for browsing (lg:grid-cols-3)
- Max container width: max-w-7xl for main content

### D. Component Library

**Navigation**:
- Sticky bottom tab bar (mobile): Home, Categories, Cart, Orders, Profile
- Top app bar: Logo left, Search center, Cart icon (with badge) right
- Category pills: Horizontal scrollable chips below header
- Breadcrumb navigation for deep menu levels

**Menu & Product Cards**:
- Dish Card: Image (16:9 ratio), Name, Description (2 lines), Price, Add button
- Category Card: Large image (4:3), Category name overlay, Dish count badge
- Featured Banner: Full-width carousel with food imagery, promotional text
- Search Results: Compact list view with thumbnail, name, price, quick add

**Cart & Checkout**:
- Floating Cart Button: Fixed bottom with total price, item count badge
- Cart Drawer: Slide-up panel with segmented view (Tiffins, Sides, Drinks, etc.)
- Item Row: Thumbnail, Name, Quantity controls (-/+), Price, Delete icon
- Order Summary Card: Subtotal, Delivery fee, Taxes, Total (bold, larger)
- Address Card: Radio selection, Saved addresses with edit/delete actions
- Payment Methods: Radio cards with provider logos (Stripe integration)

**Forms & Inputs**:
- Text inputs: Rounded-lg, ring-2 focus state, clear icon for filled fields
- Address form: Multi-step with progress indicator
- Quantity controls: Pill-shaped with - and + buttons, number display
- Primary CTA buttons: Rounded-full, shadow-lg, w-full on mobile
- Secondary buttons: Outline variant with border-2

**Data Display**:
- Order History Cards: Order date, Items summary, Status badge, Total, Reorder button
- Timeline: Vertical stepper for order tracking (Placed → Preparing → Delivered)
- Empty States: Large illustration, Helpful message, Primary action button
- Price Breakdown: Table-like rows with item-price pairs, dividers, bold total

**Overlays & Feedback**:
- Modal Dialogs: Centered on desktop, Bottom sheet on mobile, Backdrop blur
- Toast Notifications: Top-center, Auto-dismiss, Icon + Message + Close
- Loading States: Skeleton screens for cards, Spinner for actions
- Success Animations: Checkmark with subtle scale animation on add-to-cart

### E. Interactions & Animations

**Micro-interactions** (minimal, purposeful):
- Add to Cart: Quick scale pulse on button, Cart icon bounce
- Quantity Change: Smooth number transition
- Image Load: Fade-in with blur-up effect
- Card Hover: Subtle lift (translate-y-1) with shadow increase
- Pull to Refresh: Native-like loading indicator

**Page Transitions**:
- Route changes: Simple fade (150ms)
- Modal entry: Slide-up from bottom (mobile), Fade + scale (desktop)
- No unnecessary scroll-triggered animations

---

## Images & Visual Assets

**Hero Section**: 
- Full-width banner (not full-height) showcasing diverse Indian cuisine spread
- Vibrant food photography with steam/garnish details
- Overlay gradient (dark at bottom) for text readability
- CTA: "Order Your Feast Today" with prominent button

**Category Images**:
- High-quality food photography for each meal type and category
- Consistent lighting and styling across all images
- Use warm, natural tones to enhance appetite appeal
- Image aspect ratio: 16:9 for dishes, 4:3 for categories

**Throughout App**:
- Dish thumbnails: Square (1:1) for compact list views
- Featured items: Wider format (16:9) for emphasis
- Empty cart illustration: Friendly, minimal line art
- Success confirmation: Celebration-themed visual (order placed)

---

## Mobile-Specific Considerations

**Touch Targets**: Minimum 44px height for all interactive elements
**Thumb Zone**: Primary actions within bottom 40% of screen
**Horizontal Scrolling**: Categories, Featured dishes use snap-scroll
**Keyboard Handling**: Inputs scroll into view, Dismiss on tap outside
**Offline Support**: Cached menu data, Clear offline indicators
**Performance**: Lazy load images, Virtual scrolling for long lists

---

## Accessibility & Dark Mode

- WCAG AA contrast ratios maintained across all themes
- Dark mode uses elevated surfaces (not pure black) for depth
- Form inputs maintain visible borders in dark mode
- Focus indicators: 3px ring with brand color
- All images have descriptive alt text
- Cart count announced to screen readers on updates