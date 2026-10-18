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

Run the migration in `supabase/migrations/202610140001_admin_products_orders.sql` in Supabase SQL Editor. It creates the admin allow-list, product and order tables, row-level security policies, and public product image bucket with admin-only writes.

## Important integration status

The admin screen manages rows in the Supabase `products` and `orders` tables. The existing storefront catalog still starts from its bundled product data; a separate storefront-sync step is required before edits in the admin catalog automatically replace the bundled storefront catalog.
