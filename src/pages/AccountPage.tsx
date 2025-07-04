import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Package, MapPin, CreditCard, Settings } from "lucide-react";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">João Silva</CardTitle>
                    <p className="text-sm text-muted-foreground">joao@email.com</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <User className="mr-2 h-4 w-4" />
                    Meus Dados
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Package className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <MapPin className="mr-2 h-4 w-4" />
                    Endereços
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagamentos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta! 👋</h2>
                <p className="text-muted-foreground">
                  Gerencie suas informações pessoais, pedidos e preferências.
                </p>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">3 Pedidos</h3>
                  <p className="text-sm text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-success mx-auto mb-2" />
                  <h3 className="font-semibold">R$ 284,70</h3>
                  <p className="text-sm text-muted-foreground">Total gasto</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Badge className="mx-auto mb-2 bg-accent/20 text-accent">VIP</Badge>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-sm text-muted-foreground">Cliente especial</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center">
                          🔑
                        </div>
                        <div>
                          <h4 className="font-semibold">Pedido #CHV{20250100 + order}</h4>
                          <p className="text-sm text-muted-foreground">
                            {order === 1 ? "Entregue" : order === 2 ? "Em trânsito" : "Preparando"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {(order * 29.90).toFixed(2)}</p>
                        <Badge 
                          variant={order === 1 ? "default" : "secondary"}
                          className={order === 1 ? "bg-success" : ""}
                        >
                          {order === 1 ? "Entregue" : order === 2 ? "Em trânsito" : "Preparando"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos os Pedidos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccountPage;