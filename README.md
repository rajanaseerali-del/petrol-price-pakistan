# Petrol Price Pakistan (https://petrolpricepakistan.pk)

An authoritative, fast, and SEO-optimized web application delivering verified, real-time notified prices for Petrol (Super), High-Speed Diesel (HSD), and Hi-Octane (RON 97) in Pakistan.

Built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase PostgreSQL schema with Row Level Security (RLS).

---

## 🚀 Key Features

1. **Strict Data Accuracy & Integrity**:
   - Zero placeholder or AI-generated prices.
   - Sourced from official **OGRA Notified Petroleum Publications** and **Ministry of Energy (Petroleum Division)** announcements.
   - Internal math computed in **integer Paisas** (1 PKR = 100 Paisa) to prevent floating-point rounding errors.
   - Non-destructive history: prevents older or conflicting notifications from silently overwriting verified rates.
   - Freshness indicators alerting visitors when source checks exceed 72 hours.

2. **Full Responsive UI & Visual Identity**:
   - Clean, light aesthetics with dignified emerald-green accents reflecting Pakistan's national identity.
   - Interactive Recharts visualization for historical price trends.
   - Dynamic Journey & Fuel Cost Calculator with round-trip estimates and custom mileage calculations.
   - Reusable AdSense slots prepared with pre-allocated containers to avoid Cumulative Layout Shift (CLS).

3. **Complete Technical SEO**:
   - Canonical URLs on every route.
   - OpenGraph and Twitter card metadata.
   - Dynamic XML sitemap (`/sitemap.xml`) and search-engine optimized `robots.txt`.
   - Google structured data (`schema.org/Product` and `schema.org/WebSite`) for rich snippet indexing.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict type checking)
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Validation**: Zod schema validation
- **Charts**: Recharts
- **Testing**: Node / Vitest automated test suite

---

## ⚙️ Environment Variables (.env.local)

Copy `.env.example` to `.env.local` and provide your secrets:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Cron Job Security (For Vercel Cron or GitHub Actions)
CRON_SECRET=your_super_secret_cron_token_here

# Google AdSense (Disabled by default until configured)
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Application URL
NEXT_PUBLIC_SITE_URL=https://petrolpricepakistan.pk
```

---

## 🗄️ Supabase Database Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and execute it.
   - This creates tables for `fuel_products`, `price_records`, `source_check_logs`, and `admin_audit_logs`.
   - It automatically enables **Row Level Security (RLS)** so public users can only read approved records.
   - It seeds the database with official regulated fuel products.

---

## 🧪 Running Automated Tests

Run the verification pipeline test suite:
```bash
node tests/run-verification-tests.js
```

All 6 core pipeline assertions verify:
- Integer paisa arithmetic calculations (increases and decreases).
- Malformed/implausible price rejection.
- Backdated notification overwrite protection.
- Cross-source disagreement conflict detection.
- Stale data warnings.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables in the Vercel project settings (`CRON_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, etc.).
4. Add `vercel.json` if configuring scheduled Cron jobs:
```json
{
  "crons": [
    {
      "path": "/api/cron/check-prices",
      "schedule": "0 */6 * * *"
    }
  ]
}
```
5. Deploy! Vercel will automatically build the production bundle and assign SSL.

---

## 📋 Google AdSense Checklist

Before applying for AdSense approval:
- [x] Unique, original content answering genuine user queries.
- [x] Complete legal pages: `/about`, `/contact`, `/privacy-policy`, `/editorial-policy`, and `/disclaimer`.
- [x] Clear ownership and contact form for data corrections.
- [x] Zero misleading claims, click incentives, or auto-refreshing spam.
- [x] Set `NEXT_PUBLIC_ADSENSE_ENABLED=true` and provide your Publisher ID in `.env.local` once approved.
