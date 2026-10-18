# Green Page BD — Admin and Supabase setup

## Environment variables

Set these in local `.env` and in Vercel Project Settings → Environment Variables:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use only the Supabase publishable key in browser code. Never expose a `service_role` or secret key in a `VITE_` variable.

## Admin account

1. Create a user in Supabase Authentication → Users.
2. Copy that user's UUID.
3. Insert the UUID into `public.admin_users(user_id)`.
4. Open `/admin` and sign in with that account.

RLS policies must remain enabled. Being able to sign in does not by itself grant admin database access; the user must be allow-listed in `admin_users`.

## Database

1. Run `supabase/migrations/202610140001_admin_products_orders.sql` in Supabase SQL Editor. It creates the admin allow-list, product and order tables, row-level security policies, and public product image bucket with admin-only writes. If you already ran the earlier version, run this updated migration again so the product visibility policy is updated.
2. Run `supabase/seed.sql` once to add the seven existing storefront products to the database. It uses `ON CONFLICT DO NOTHING`, so it won't overwrite products you have already edited.
3. Open `/admin`, sign in, and manage products/orders.

## Current integration

The storefront reads active products from Supabase and uses the bundled catalog as a fallback when the database has not been seeded. Admin edits to seeded product IDs override bundled entries. Hiding a seeded product removes it from the storefront; the database row is retained so the bundled fallback does not make it reappear.
