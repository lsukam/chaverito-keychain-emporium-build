-- Create comprehensive e-commerce schema for Chaverito keychain store

-- Categories table for keychain themes
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  color_theme TEXT, -- Store theme colors for UI
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products table for keychains
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES public.categories(id),
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  weight DECIMAL(8,2), -- in grams
  dimensions TEXT, -- e.g., "5x3x1cm"
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Product images table
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Product variants table (for different colors, sizes, styles)
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Blue", "Large", "Glow in the dark"
  value TEXT NOT NULL, -- specific value
  price_adjustment DECIMAL(10,2) DEFAULT 0, -- price difference from base
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Shopping cart table
CREATE TABLE public.shopping_cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- for guest users
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, variant_id),
  UNIQUE(session_id, product_id, variant_id)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  
  -- Customer information
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Shipping address
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'Brazil',
  
  -- Billing address (can be same as shipping)
  billing_address_line1 TEXT,
  billing_address_line2 TEXT,
  billing_city TEXT,
  billing_state TEXT,
  billing_postal_code TEXT,
  billing_country TEXT,
  
  notes TEXT,
  tracking_number TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  variant_id UUID REFERENCES public.product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  product_name TEXT NOT NULL, -- Store name in case product is deleted
  variant_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Wishlist table
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Product reviews table
CREATE TABLE public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Public access policies for product catalog
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Product images are viewable by everyone" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Product variants are viewable by everyone" ON public.product_variants FOR SELECT USING (is_active = true);

-- Shopping cart policies
CREATE POLICY "Users can manage their own cart" ON public.shopping_cart FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Guest cart access by session" ON public.shopping_cart FOR ALL USING (session_id IS NOT NULL AND user_id IS NULL);

-- Order policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Order items are viewable with orders" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Wishlist policies
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Review policies
CREATE POLICY "Reviews are viewable by everyone" ON public.product_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create reviews" ON public.product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.product_reviews FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_product_images_product ON public.product_images(product_id);
CREATE INDEX idx_shopping_cart_user ON public.shopping_cart(user_id);
CREATE INDEX idx_shopping_cart_session ON public.shopping_cart(session_id);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  SELECT 'CHV' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 6, '0') INTO new_number;
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shopping_cart_updated_at BEFORE UPDATE ON public.shopping_cart FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON public.product_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories for the keychain themes
INSERT INTO public.categories (name, slug, description, color_theme, sort_order) VALUES
('Stitch', 'stitch', 'Adorable blue alien keychains from Lilo & Stitch', 'hsl(197 71% 52%)', 1),
('Toothless', 'toothless', 'Night Fury dragon keychains from How to Train Your Dragon', 'hsl(240 6% 10%)', 2),
('BT21', 'bt21', 'Cute character keychains from the BT21 universe', 'hsl(261 83% 58%)', 3),
('Skzoo', 'skzoo', 'Fun animal character keychains from Stray Kids universe', 'hsl(45 93% 58%)', 4),
('Pokémon', 'pokemon', 'Iconic Pokémon character keychains', 'hsl(349 89% 60%)', 5),
('Labubu', 'labubu', 'Trendy rabbit character keychains', 'hsl(171 77% 64%)', 6);

-- Insert sample products for each category
INSERT INTO public.products (name, slug, description, short_description, category_id, price, stock_quantity, sku, is_featured) 
SELECT 
  name,
  slug,
  description,
  short_description,
  (SELECT id FROM public.categories WHERE categories.name = category),
  price,
  stock_quantity,
  sku,
  is_featured
FROM (VALUES
  ('Stitch Classic Keychain', 'stitch-classic', 'Classic blue Stitch keychain with moveable arms and detailed features', 'Adorable Stitch keychain with moveable parts', 'Stitch', 29.90, 50, 'CHV-STI-001', true),
  ('Angel Pink Keychain', 'angel-pink', 'Pink Angel (Experiment 624) keychain, Stitch''s girlfriend', 'Sweet pink Angel keychain', 'Stitch', 29.90, 30, 'CHV-STI-002', false),
  ('Toothless Night Fury', 'toothless-night-fury', 'Detailed black Toothless keychain with green eyes and wings', 'Iconic Night Fury dragon keychain', 'Toothless', 34.90, 25, 'CHV-TOO-001', true),
  ('Light Fury White', 'light-fury-white', 'Beautiful white Light Fury keychain with blue eyes', 'Elegant Light Fury keychain', 'Toothless', 34.90, 20, 'CHV-TOO-002', false),
  ('Koya Bear BT21', 'koya-bear-bt21', 'Sleepy blue bear Koya from BT21 collection', 'Cute sleepy Koya bear', 'BT21', 27.90, 40, 'CHV-BT21-001', true),
  ('Mang Horse BT21', 'mang-horse-bt21', 'Dancing horse Mang with heart nose from BT21', 'Energetic Mang horse keychain', 'BT21', 27.90, 35, 'CHV-BT21-002', false),
  ('PuppyM Skzoo', 'puppym-skzoo', 'Adorable white puppy representing Seungmin from Stray Kids', 'Cute PuppyM keychain', 'Skzoo', 32.90, 30, 'CHV-SKZ-001', true),
  ('Leebit Skzoo', 'leebit-skzoo', 'White rabbit representing Lee Know from Stray Kids', 'Fluffy Leebit rabbit keychain', 'Skzoo', 32.90, 25, 'CHV-SKZ-002', false),
  ('Pikachu Classic', 'pikachu-classic', 'Classic yellow Pikachu keychain with red cheeks', 'Iconic Pikachu keychain', 'Pokémon', 39.90, 60, 'CHV-POK-001', true),
  ('Eevee Brown', 'eevee-brown', 'Fluffy brown Eevee keychain with big eyes', 'Adorable Eevee keychain', 'Pokémon', 39.90, 45, 'CHV-POK-002', false),
  ('Labubu Original', 'labubu-original', 'Original cream-colored Labubu with pointed ears', 'Trendy Labubu keychain', 'Labubu', 44.90, 35, 'CHV-LAB-001', true),
  ('Labubu Pink', 'labubu-pink', 'Pink version of the popular Labubu character', 'Pink Labubu keychain', 'Labubu', 44.90, 30, 'CHV-LAB-002', false)
) AS sample_data(name, slug, description, short_description, category, price, stock_quantity, sku, is_featured);