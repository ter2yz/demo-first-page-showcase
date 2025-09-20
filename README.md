# FirstPage Interview Assessment

This project is an assessment for the FirstPage interview process.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Type Checking:** TypeScript
- **Form Validation:** React Hook Form + Zod
- **Map Integration:** Google Maps via @vis.gl/react-google-maps
- **Hosting:** Netlify

## 🛠️ Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Build for production:

```bash
npm run build
```

Lint and format code:

```bash
npm run lint
npm run format:fix
```

## 🌏 Environment Setup (Google Maps)

Copy `.env.example` to `.env.local` and fill in your Google Maps API credentials:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_MAP_ID=your_map_id_here
```

## 📬 Contact Form API Route Details

The API route at `app/api/contact/route.ts` acts as a backend-for-frontend (BFF) for the contact form:

- Handles POST requests from the contact form, performing basic validation and logging all requests and errors server-side.
- Returns a mock success response (HTTP 200) or error (HTTP 400/500) for demonstration purposes.
- Supports error simulation using the `forceError` query parameter (see `/contact-showcase` for an example of error handling in the UI).
- Designed to be easily extended for real backend integration or additional server-side logic.

## 📄 Pages

- `/contact`: Standard contact form page (normal user flow).
- `/contact-showcase`: Demonstrates error handling by forcing the API to return an error (for interview review).

---

Feel free to reach out if you have any questions or need further clarification!
