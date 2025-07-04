import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price: number | null;
  short_description: string;
  slug: string;
  stock_quantity: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color_theme: string;
}

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndProducts();
    }
  }, [categorySlug]);

  const fetchCategoryAndProducts = async () => {
    try {
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .eq('is_active', true)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }

      setCategory(categoryData);

      // Fetch products for this category
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('is_active', true)
        .order('sort_order');

      if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
      }

      setProducts(productsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <Button variant="accent" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Hero */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">{category.name}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="mt-6">
            <Badge 
              className="text-sm px-4 py-2"
              style={{ backgroundColor: category.color_theme }}
            >
              {products.length} produtos disponíveis
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Em breve!</h3>
              <p className="text-muted-foreground">
                Novos chaveiros {category.name.toLowerCase()} chegando em breve.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card 
                  key={product.id}
                  className="group cursor-pointer hover:shadow-product transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative">
                    <div 
                      className="h-48 w-full opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: category.color_theme }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-20">🔑</span>
                    </div>
                    {product.sale_price && (
                      <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                        -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {product.short_description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col">
                        {product.sale_price ? (
                          <>
                            <span className="text-lg font-bold text-success">
                              {formatPrice(product.sale_price)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        variant="accent" 
                        size="sm"
                        disabled={product.stock_quantity === 0}
                      >
                        {product.stock_quantity === 0 ? 'Esgotado' : 'Comprar'}
                      </Button>
                    </div>
                    
                    {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                      <p className="text-warning text-xs mt-2">
                        Apenas {product.stock_quantity} unidades restantes!
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;