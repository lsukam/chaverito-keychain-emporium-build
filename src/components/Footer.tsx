import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import chaveritoLogo from "@/assets/chaverito-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter section */}
      <div className="bg-accent py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-accent-foreground mb-4">
            Fique por dentro das novidades!
          </h3>
          <p className="text-accent-foreground/90 mb-6 max-w-md mx-auto">
            Receba em primeira mão os lançamentos e ofertas exclusivas da Chaverito
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <Input 
              type="email" 
              placeholder="Seu e-mail" 
              className="bg-white text-foreground"
            />
            <Button variant="default" className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Inscrever
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={chaveritoLogo} 
                alt="Chaverito" 
                className="h-10 w-auto rounded-md"
              />
              <h3 className="text-2xl font-bold">Chaverito</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Sua loja online de chaveiros dos personagens mais queridos. 
              Qualidade premium, entrega rápida e atendimento especializado.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>📍 São Paulo, Brasil</p>
              <p>📞 (11) 99999-9999</p>
              <p>✉️ contato@chaverito.com.br</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Categorias</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Ofertas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Minha Conta</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pedidos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Rastreamento</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Payment and shipping info */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Formas de Pagamento</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white rounded px-3 py-1 text-primary text-sm font-medium">PIX</div>
                <div className="bg-white rounded px-3 py-1 text-primary text-sm font-medium">Cartão</div>
                <div className="bg-white rounded px-3 py-1 text-primary text-sm font-medium">Boleto</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entrega</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-success rounded px-3 py-1 text-success-foreground text-sm font-medium">Correios</div>
                <div className="bg-success rounded px-3 py-1 text-success-foreground text-sm font-medium">Frete Grátis</div>
                <div className="bg-success rounded px-3 py-1 text-success-foreground text-sm font-medium">Todo Brasil</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Chaverito. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a> • 
            <a href="#" className="hover:text-accent transition-colors ml-1">Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;