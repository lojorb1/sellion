"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  AlertTriangle, 
  Star, 
  DollarSign,
  Zap,
  Brain,
  Target,
  LogOut,
  Settings,
  Bell,
  ArrowLeft
} from "lucide-react"
import { getUser, removeUser, isAuthenticated } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [selectedMarketplace, setSelectedMarketplace] = useState<string | null>(null)

  useEffect(() => {
    // Verifica autenticação
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const userData = getUser()
    if (userData) {
      setUser(userData)
    }
  }, [router])

  const handleLogout = () => {
    removeUser()
    router.push("/")
  }

  // Dados mockados para cada marketplace
  const marketplaceData = {
    total: {
      sales: "R$ 12.847",
      change: "+23%",
      trend: "up" as const
    },
    "mercado-livre": {
      name: "Mercado Livre",
      sales: "R$ 7.420",
      change: "+18%",
      trend: "up" as const,
      orders: 28,
      conversion: "4.2%",
      avgTicket: "R$ 265"
    },
    "amazon": {
      name: "Amazon",
      sales: "R$ 3.180",
      change: "+35%",
      trend: "up" as const,
      orders: 12,
      conversion: "6.1%",
      avgTicket: "R$ 265"
    },
    "shopee": {
      name: "Shopee",
      sales: "R$ 1.847",
      change: "+12%",
      trend: "up" as const,
      orders: 15,
      conversion: "3.8%",
      avgTicket: "R$ 123"
    },
    "magalu": {
      name: "Magalu",
      sales: "R$ 400",
      change: "-8%",
      trend: "down" as const,
      orders: 3,
      conversion: "2.1%",
      avgTicket: "R$ 133"
    }
  }

  const handleSalesCardClick = () => {
    if (selectedMarketplace) {
      setSelectedMarketplace(null)
    }
  }

  const handleMarketplaceSelect = (marketplace: string) => {
    setSelectedMarketplace(marketplace)
  }

  const renderSalesCard = () => {
    if (selectedMarketplace && selectedMarketplace !== "total") {
      const data = marketplaceData[selectedMarketplace as keyof typeof marketplaceData]
      return (
        <Card 
          className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gray-800/50 border-gray-700 cursor-pointer hover:bg-gray-800/70 transition-colors"
          onClick={handleSalesCardClick}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <DollarSign className="w-4 h-4" />
              Vendas Hoje - {data.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-green-400">{data.sales}</div>
              <div className={`flex items-center text-sm mt-1 ${data.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {data.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {data.change} vs ontem
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
              <div className="text-center">
                <div className="text-lg font-semibold">{data.orders}</div>
                <div className="text-xs text-gray-400">Pedidos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{data.conversion}</div>
                <div className="text-xs text-gray-400">Conversão</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{data.avgTicket}</div>
                <div className="text-xs text-gray-400">Ticket Médio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Vendas Hoje - Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{marketplaceData.total.sales}</div>
          <div className="flex items-center text-sm text-green-400 mt-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            {marketplaceData.total.change} vs ontem
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-3">Clique para ver por marketplace:</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(marketplaceData).filter(([key]) => key !== 'total').map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleMarketplaceSelect(key)}
                  className="flex items-center justify-between p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <span className="text-sm font-medium">{data.name}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{data.sales}</div>
                    <div className={`text-xs ${data.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {data.change}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sellion
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-gray-400">Aqui está um resumo das suas vendas hoje</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderSalesCard()}

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <div className="flex items-center text-sm text-green-400 mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% vs ontem
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Produtos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.234</div>
              <div className="flex items-center text-sm text-yellow-400 mt-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                23 com baixo estoque
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Nota Sellion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">8.7</div>
              <Progress value={87} className="mt-2 h-2" />
              <div className="text-sm text-gray-400 mt-1">Saúde da operação</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Alertas Inteligentes
            </CardTitle>
            <CardDescription>Ações recomendadas pela IA para otimizar suas vendas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-400">Produto com queda nas vendas</h4>
                <p className="text-sm text-gray-400 mt-1">
                  "Smartphone XYZ" teve 45% menos vendas esta semana. Concorrente baixou preço para R$ 899.
                </p>
                <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                  Ajustar Preço
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-400">Estoque baixo detectado</h4>
                <p className="text-sm text-gray-400 mt-1">
                  5 produtos estão com menos de 10 unidades. Previsão de ruptura em 3 dias.
                </p>
                <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                  Ver Produtos
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-400">Oportunidade identificada</h4>
                <p className="text-sm text-gray-400 mt-1">
                  "Fone Bluetooth ABC" pode aumentar 30% nas vendas com título otimizado.
                </p>
                <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                  Otimizar Título
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Performance por Marketplace
              </CardTitle>
              <CardDescription>Vendas dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(marketplaceData).filter(([key]) => key !== 'total').map(([key, data]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{data.name}</span>
                      <span className="text-sm text-gray-400">{data.sales}</span>
                    </div>
                    <Progress 
                      value={parseInt(data.sales.replace(/[^\d]/g, '')) / 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Metas do Mês
              </CardTitle>
              <CardDescription>Progresso das suas metas de vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Faturamento</span>
                    <span className="text-sm text-gray-400">R$ 285k / R$ 400k</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">71% da meta</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Pedidos</span>
                    <span className="text-sm text-gray-400">847 / 1000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">85% da meta</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Novos Produtos</span>
                    <span className="text-sm text-gray-400">42 / 50</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">84% da meta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
