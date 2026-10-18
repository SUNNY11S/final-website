-- Run once after the schema migration to make the current storefront catalog editable in /admin.
-- Existing IDs are preserved so admin edits override the bundled catalog entries.
insert into public.products
(id, name, category, category_label, price, original_price, badge, short_desc, image_url, is_active)
values
('mega-pack-white-pebbles', '10 Pcs Mega Pack (White Pebbles)', 'indoor-packages', 'Indoor Plant Package', 1099, 1599, '১০ পিস মাত্র ১০৯৯ টাকা · সাদা পাথর সহ', '১০ পিস সতেজ ইনডোর প্ল্যান্ট + সাদা কিউট টব + প্রিমিয়াম সাদা পাথর (White Pebbles)।', '/src/assets/images/combo_10_white_pebbles_1791988986755.jpg', true),
('mega-pack-color-pebbles', '10 Pcs Mega Pack (Color Pebbles)', 'indoor-packages', 'Indoor Plant Package', 1150, 1650, '১০ পিস মাত্র ১১৫০ টাকা · কালার পাথর সহ', '১০ পিস সতেজ ইনডোর প্ল্যান্ট + সাদা কিউট টব + আকর্ষণীয় রঙিন পাথর।', '/src/assets/images/combo_10_color_pebbles_1791988987184.jpg', true),
('starter-green-pack', 'Starter Green Pack', 'indoor-packages', 'Indoor Plant Package', 999, 1350, 'Popular for Beginners', '8–10 indoor plants in clean white ceramic pots with decorative river pebbles.', '/src/assets/images/starter_green_pack_1791648706401.jpg', true),
('home-decor-pack', 'Home Decor Pack', 'indoor-packages', 'Indoor Plant Package', 999, 1450, 'Best for Living Room', '8–10 indoor plants curated for living room decoration and shelf styling.', '/src/assets/images/home_decor_pack_1791648720341.jpg', true),
('premium-green-pack', 'Premium Green Pack', 'indoor-packages', 'Indoor Plant Package', 999, 1550, 'Selected Premium Plants', '8–10 indoor plants featuring selected exotic foliage varieties and luxury textures.', '/src/assets/images/premium_green_pack_1791648732538.jpg', true),
('classic-stand-set', 'Classic Stand Set', 'stand-packages', 'Plant Stand Package', 500, 750, 'Modern Decorative Design', '2 indoor plants + metal stand with modern decorative design.', '/src/assets/images/classic_stand_set_1791648744167.jpg', true),
('mini-stand-decor', 'Mini Stand Decor', 'stand-packages', 'Plant Stand Package', 500, 700, 'Ideal for Desk / Table', '2 plants + compact stand ideal for desk, computer table, or dining corner.', '/src/assets/images/mini_stand_decor_1791648756741.jpg', true)
on conflict (id) do nothing;
