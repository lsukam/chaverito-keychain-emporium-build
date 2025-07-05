import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import stitchKeychain from "@/assets/stitch-keychain.jpg";
import toothlessKeychain from "@/assets/toothless-keychain.jpg";
import bt21Keychain from "@/assets/bt21-keychain.jpg";
import pokemonKeychain from "@/assets/pokemon-keychain.jpg";

// Temporary image mapping for demo
const categoryImages: { [key: string]: string } = {
  'stitch': stitchKeychain,
  'toothless': toothlessKeychain,
  'bt21': bt21Keychain,
  'pokemon': pokemonKeychain,
  'skzoo': bt21Keychain, // Using BT21 as placeholder
  'labubu': stitchKeychain, // Using Stitch as placeholder
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color_theme: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-24 bg-muted rounded-t-lg"></div>
                <CardContent className="p-3">
                  <div className="h-4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Explore por Categoria</h2>
          <p className="text-muted-foreground text-lg">
            Encontre seus personagens favoritos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/categoria/${category.slug}`}>
              <Card 
                className="group cursor-pointer hover:shadow-product transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative">
                  <div 
                    className="h-24 w-full rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: category.color_theme }}
                  />
                  <img
                    src={categoryImages[category.slug] || '/placeholder.svg'}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                </div>
                
                <CardContent className="p-3 text-center">
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;