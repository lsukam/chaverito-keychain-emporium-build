import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartPage = () => {
  // Mock cart items - will be replaced with real cart logic later
  const cartItems = [
    {
      id: 1,
      name: "Chaveiro Stitch Fofo",
      price: 29.90,
      quantity: 2,
      image: "🔑",
      category: "Stitch"
    },
    {
      id: 2,
      name: "Chaveiro Toothless Dragão",
      price: 34.90,
      quantity: 1,
      image: "🔑",
      category: "Toothless"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 149.90 ? 0 : 15.90;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">
              Adicione alguns chaveiros incríveis para começar suas compras!
            </p>
            <Button variant="accent" size="lg">
              Explorar Produtos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Meu Carrinho</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.category}</p>
                      <p className="font-bold text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className={shipping === 0 ? "text-success font-semibold" : ""}>
                      {shipping === 0 ? "GRÁTIS" : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  {subtotal < 149.90 && (
                    <p className="text-sm text-muted-foreground">
                      Adicione {formatPrice(149.90 - subtotal)} para frete grátis!
                    </p>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Button variant="accent" size="lg" className="w-full mt-6">
                  Finalizar Compra
                </Button>
                
                <Button variant="outline" className="w-full mt-3">
                  Continuar Comprando
                </Button>
                
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Pagamento 100% Seguro
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Entrega Rápida em Todo Brasil
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;