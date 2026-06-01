# Backend Integration Guide

This document provides instructions for backend developers to migrate the current mock service layer to a dynamic database-driven architecture for the Farias project.

## 1. Architecture Overview
The frontend is built with Next.js (App Router) and uses a centralized service layer to manage data fetching.

- **Service Layer**: [src/services/api.ts](src/services/api.ts) contains all async functions used by the components.
- **Type Definitions**: [src/types/index.ts](src/types/index.ts) serves as the single source of truth for all data models.
- **Environment Variable**: Use `NEXT_PUBLIC_API_URL` in your `.env.local` file to point to your backend API.

## 2. Integration Steps
To replace the mock data with your live API:
1. Open [src/services/api.ts](src/services/api.ts).
2. Uncomment the `fetch()` blocks inside each function (or implement your preferred fetching library like Axios).
3. Replace or modify the endpoints to match your API structure.
4. Ensure your API responses match the TypeScript interfaces in [src/types/index.ts](src/types/index.ts).

## 3. Database Schema Requirements

### Products Table
Refer to the `Product` interface.
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier |
| `name` | String | Product title |
| `category` | String | e.g., "Lip Gloss", "Skin Care" |
| `price` | Decimal | Current price |
| `oldPrice` | Decimal? | Previous price for sale display |
| `image` | String | Primary image URL (Absolute path recommended) |
| `badge` | Enum? | 'Sale' or 'New' |
| `description`| Text | Product description |
| `shortDescription` | String? | Brief summary for product cards and previews |
| `slug` | String | Unique URL-friendly identifier |
| `tags` | JSON Array | List of strings |
| `gallery` | JSON Array | List of image URLs |
| `videos` | JSON Array | YouTube video IDs (e.g., ["vP9X2V9c3Uw"]) |
| `purchaseLink`| String? | External checkout URL |
| `variantType` | String? | Label for variants (e.g., "Colors") |
| `variants` | JSON Object| Array of `{ name, image, gallery: [] }` |
| `featured` | Boolean | Whether to show in Featured section |

### Blogs Table
Refer to the `Blog` interface.
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier |
| `slug` | String | Unique URL-friendly identifier |
| `category` | String | Blog category |
| `author` | String | Author name |
| `day` | String | Day of publication (e.g., "08") |
| `month` | String | Month of publication (e.g., "Apr") |
| `title` | String | Blog title |
| `excerpt` | Text | Short summary for cards |
| `description`| Text | Main content |
| `image` | String | Cover image URL |
| `isFeatured` | Boolean | Highlight on homepage/blog list |

### CMS Content Tables
The following structures are used for homepage sections and site-wide settings:
- **BannerSlides**: `id`, `subtitle`, `title`, `description`, `buttonText`, `buttonLink`, `backgroundImage`, `mobileBackgroundImage`.
- **WhatWeDo**: `subtitle`, `title`, `leftImage`, `rightImage`, `testimonial (text, author)`.
- **Stats**: `subtitle`, `title`, `description`, `stats (label, value, suffix)`.
- **Instagram**: `subtitle`, `title`, `images (id, url, link)`.
- **FAQ**: `subtitle`, `title`, `image`, `faqs (id, question, answer)`.
- **SocialLinks**: `facebook`, `instagram`, `tiktok`.
- **TopBar**: `text`.

## 4. Expected API Endpoints
The service layer currently provides skeletons for the following:

- `GET /products`: returns `Product[]`
- `GET /products/:slug`: returns `Product`
- `GET /blogs`: returns `Blog[]`
- `GET /blogs/:slug`: returns `Blog`
- `GET /banner-data`: returns `BannerItem[]`
- `GET /about-data`: returns `AboutData`
- `GET /contact-data`: returns `ContactData`
- `GET /faq-data`: returns `FaqData`
- `GET /shop-header`: returns `ShopHeader`
- `POST /contact`: Expected to receive contact form data from [app/contact/page.tsx](app/contact/page.tsx).
- `POST /newsletter`: Receives `{ email }` for subscribers.

## 5. Form Integration Details

### Contact Form
The contact page [app/contact/page.tsx](app/contact/page.tsx) handles submission.
- **Fields**: `firstName`, `lastName`, `email`, `mobile`, `message`.
- **Validation**: Ensure all fields are sanitized. Return `200 OK` on success.

### Newsletter Form
The footer [components/Footer.tsx](components/Footer.tsx) contains a newsletter signup.
- **Fields**: `email`.
- **Logic**: Store in a `Subscribers` table or sync with a service like Mailchimp/SendGrid.

## 6. Global Requirements
- **CORS**: Enable CORS for the frontend domain to allow requests.
- **Image Hosting**: Use absolute URLs for all image fields or configure `next.config.ts` to allow your image host.
- **Slugs**: Slugs must be unique and URL-friendly.

---
*Updated for Service Layer Architecture*
