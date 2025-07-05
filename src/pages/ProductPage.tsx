import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import stitchKeychain from "@/assets/stitch-keychain.jpg";
import toothlessKeychain from "@/assets/toothless-keychain.jpg";
import bt21Keychain from "@/assets/bt21-keychain.jpg";
import pokemonKeychain from "@/assets/pokemon-keychain.jpg";

// Temporary image mapping
const imageMap: { [key: string]: string } = {
  'stitch-classic': stitchKeychain,
  'toothless-night-fury': toothlessKeychain,
  'koya-bear-bt21': bt21Keychain,
  'pikachu-classic': pokemonKeychain,
};

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  dimensions: string;
  weight: number;
  category: {
    name: string;
    color_theme: string;
  };
}

const ProductPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (productSlug) {
      fetchProduct();
      window.scrollTo(0, 0);
    }
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          description,
          short_description,
          price,
          sale_price,
          stock_quantity,
          dimensions,
          weight,
          categories:category_id (
            name,
            color_theme
          )
        `)
        .eq('slug', productSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      if (data) {
        setProduct({
          ...data,
          category: data.categories
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      image: imageMap[product.slug] || '🔑',
      slug: product.slug,
    };

    addToCart(cartItem, quantity);
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
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
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <Link to="/">
              <Button variant="accent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = [imageMap[product.slug] || '🔑'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to={`/categoria/${product.category?.name.toLowerCase()}`} className="hover:text-foreground">
            {product.category?.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge 
                className="mb-2"
                style={{ backgroundColor: product.category?.color_theme }}
              >
                {product.category?.name}
              </Badge>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground">
                {product.short_description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {product.sale_price ? (
                  <>
                    <span className="text-3xl font-bold text-destructive">
                      {formatPrice(product.sale_price)}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="destructive" className="ml-2">
                      OFERTA
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {product.stock_quantity < 10 && (
                <p className="text-warning font-medium">
                  Apenas {product.stock_quantity} disponíveis!
                </p>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade:</label>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  variant="accent"
                  size="lg"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock_quantity === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                </Button>
                
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Detalhes do Produto</h3>
                <div className="space-y-3">
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensões:</span>
                      <span>{product.dimensions}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso:</span>
                      <span>{product.weight}g</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span>{product.category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Disponível:</span>
                    <span className="text-success">{product.stock_quantity} unidades</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {product.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;