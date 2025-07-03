import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="Chaverito Keychains" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Chaveiros dos Seus
            <span className="block text-accent-foreground bg-gradient-accent bg-clip-text text-transparent">
              Personagens Favoritos
            </span>
          </h1>
          
          <p className="text-xl mb-8 text-primary-foreground/90 animate-slide-up">
            Descubra nossa coleção exclusiva de chaveiros de Stitch, Toothless, BT21, Skzoo, Pokémon e Labubu. 
            Qualidade premium e entrega rápida para todo o Brasil!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
            <Button variant="accent" size="xl" className="font-bold">
              VER COLEÇÃO COMPLETA
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              OFERTAS ESPECIAIS
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Frete Grátis acima de R$ 149,90
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Pagamento Seguro
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Entrega Rápida
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-themes-stitch/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-themes-pokemon/20 rounded-full blur-lg animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;