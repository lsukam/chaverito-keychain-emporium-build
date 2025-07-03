import { useState } from "react";
import { Search, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import chaveritoLogo from "@/assets/chaverito-logo.jpg";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(3); // This will come from cart context later

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-card">
      {/* Top promotional banner */}
      <div className="bg-gradient-accent text-accent-foreground py-2 px-4 text-center">
        <p className="text-sm font-medium">
          🎉 FRETE GRÁTIS a partir de R$ 149,90 | Aproveite nossas promoções!
        </p>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={chaveritoLogo} 
              alt="Chaverito" 
              className="h-10 w-auto rounded-md"
            />
            <h1 className="text-2xl font-bold text-primary">Chaverito</h1>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar chaveiros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-2 border-border focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <div className="flex items-center justify-center gap-8">
            <Button variant="ghost" className="font-medium hover:text-accent">
              Início
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              Stitch
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              Toothless
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              BT21
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              Skzoo
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              Pokémon
            </Button>
            <Button variant="ghost" className="font-medium hover:text-accent">
              Labubu
            </Button>
            <Button variant="accent" size="sm" className="ml-4">
              OFERTAS
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;