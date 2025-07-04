import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: "Combo 3 Chaveiros",
      description: "Leve 3 chaveiros e pague apenas 2! Escolha entre qualquer categoria.",
      discount: "33% OFF",
      originalPrice: 89.70,
      salePrice: 59.80,
      category: "Combo",
      color: "hsl(var(--themes-stitch))"
    },
    {
      id: 2,
      title: "Frete Grátis",
      description: "Frete grátis para compras acima de R$ 149,90 em todo o Brasil.",
      discount: "FRETE GRÁTIS",
      originalPrice: 0,
      salePrice: 0,
      category: "Promoção",
      color: "hsl(var(--success))"
    },
    {
      id: 3,
      title: "Primeira Compra",
      description: "15% de desconto na sua primeira compra. Use o cupom: PRIMEIRA15",
      discount: "15% OFF",
      originalPrice: 0,
      salePrice: 0,
      category: "Cupom",
      color: "hsl(var(--themes-pokemon))"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 Ofertas Especiais
          </h1>
          <p className="text-xl mb-6 text-accent-foreground/90">
            Aproveite nossas promoções exclusivas e econômicas incríveis!
          </p>
          <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
            Ver Todos os Produtos
          </Button>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {offers.map((offer) => (
              <Card 
                key={offer.id}
                className="group cursor-pointer hover:shadow-product transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-destructive text-destructive-foreground font-bold">
                    {offer.discount}
                  </Badge>
                </div>
                
                <div className="relative">
                  <div 
                    className="h-32 w-full opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: offer.color }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">🏷️</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {offer.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                    {offer.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {offer.description}
                  </p>
                  
                  {offer.originalPrice > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-success">
                        {formatPrice(offer.salePrice)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(offer.originalPrice)}
                      </span>
                    </div>
                  )}
                  
                  <Button variant="accent" className="w-full">
                    Aproveitar Oferta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center py-12 bg-secondary/30 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Não perca tempo!</h2>
            <p className="text-muted-foreground mb-6">
              Ofertas por tempo limitado. Aproveite enquanto há estoque!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg">
                Ver Todos os Produtos
              </Button>
              <Button variant="outline" size="lg">
                Cadastrar para Receber Ofertas
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OffersPage;