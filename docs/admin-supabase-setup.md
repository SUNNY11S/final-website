# Green Page BD — Supabase Admin Setup

This document records the initial setup steps for the admin/database foundation.

## Environment variables

Add these to your local `.env` file and to the Vercel project's Environment Variables:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Use the Supabase publishable/anon key in the browser. Never put a Supabase `service_role` or secret key in a `VITE_` variable or client-side code.

## Admin user

1. Create the admin account in Supabase Authentication → Users.
2. Copy that user's UUID.
3. Add the UUID to `public.admin_users` using the project's approved SQL migration/setup instructions.
4. Sign in through the admin UI; database access must be enforced by Row Level Security policies, not just by hiding admin pages.

## Before enabling production orders

- Verify product and order table schemas match the application.
- Confirm anonymous customers can only create the intended order records and cannot read other customers' orders.
- Confirm only authorized admin users can manage products and update order status.
- Test image upload permissions in the `product-images` storage bucket.
- Add environment variables in Vercel and redeploy after integration is implemented.

Note: This is setup documentation only; it does not claim that the storefront is already connected to Supabase or that the admin UI is implemented.
