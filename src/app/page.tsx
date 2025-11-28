"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  AlertTriangle, 
  Star, 
  Users, 
  DollarSign,
  Eye,
  MessageSquare,
  Zap,
  Shield,
  Target,
  Brain,
  CheckCircle,
  ArrowRight,
  Play,
  ArrowLeft
} from "lucide-react"

export default function Sellion() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [selectedMarketplace, setSelectedMarketplace] = useState<string | null>(null)

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

    if (selectedMarketplace === null) {
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

    return null
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
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => router.push("/register")}
            >
              Teste Grátis 7 Dias
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
            🚀 Assistente IA para Marketplaces
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Venda Mais com
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Inteligência</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Centralize suas vendas do Mercado Livre, Amazon, Shopee e mais em um painel inteligente. 
            Nossa IA analisa performance, sugere melhorias e automatiza tarefas para você vender mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md has-[>svg]:px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
              onClick={() => router.push("/register")}
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Teste Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8">
              <Eye className="w-5 h-5 mr-2" />
              Ver Demo
            </Button>
          </div>
          
          {/* Marketplaces Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium text-gray-500">Integra com:</div>
            
            {/* Mercado Livre */}
            <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-yellow-400">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Mercado Livre</span>
            </div>

            {/* Amazon */}
            <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-400">
                <path fill="currentColor" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.83.615-3.268 0-6.104-.665-8.51-1.996-.628-.347-1.194-.726-1.7-1.14-.51-.414-.76-.63-.76-.65 0-.02.03-.06.09-.12l.225-.27c.06-.074.12-.15.18-.226.06-.075.12-.15.18-.226z"/>
                <path fill="currentColor" d="M18.996 16.125c-1.354-.465-2.982-.698-4.884-.698-1.902 0-3.53.233-4.884.698-.465.16-.698.36-.698.6s.233.44.698.6c1.354.465 2.982.698 4.884.698s3.53-.233 4.884-.698c.465-.16.698-.36.698-.6s-.233-.44-.698-.6z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Amazon</span>
            </div>

            {/* Shopee */}
            <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-500">
                <path fill="currentColor" d="M12 2L3.09 8.26l1.31 1.52L12 4.16l7.6 5.62 1.31-1.52L12 2zM4.64 9.27L12 15.58l7.36-6.31-1.31-1.52L12 13.42 5.95 7.75l-1.31 1.52z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Shopee</span>
            </div>

            {/* Magalu */}
            <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-blue-500">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Magalu</span>
            </div>

            {/* Shein */}
            <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-pink-400">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Shein</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Painel de Controle Unificado</h3>
            <p className="text-gray-400 text-lg">Todas as suas vendas, estoque e performance em um só lugar</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Visão Geral</TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-blue-600">Produtos</TabsTrigger>
              <TabsTrigger value="competitors" className="data-[state=active]:bg-blue-600">Concorrência</TabsTrigger>
              <TabsTrigger value="ai-insights" className="data-[state=active]:bg-blue-600">IA Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card className="bg-gray-800/50 border-gray-700">
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
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Top Produtos por Performance</CardTitle>
                  <CardDescription>Produtos com melhor e pior desempenho esta semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Smartphone Galaxy Pro", sales: "R$ 15.400", trend: "up", change: "+34%" },
                      { name: "Fone Bluetooth Premium", sales: "R$ 8.900", trend: "up", change: "+28%" },
                      { name: "Carregador Wireless", sales: "R$ 3.200", trend: "down", change: "-15%" },
                      { name: "Capa Protetora Ultra", sales: "R$ 2.100", trend: "down", change: "-23%" },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-400">Vendas: {product.sales}</div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 ${product.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {product.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {product.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Monitor de Concorrência</CardTitle>
                  <CardDescription>Acompanhe preços e estratégias dos seus concorrentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { competitor: "TechStore Pro", product: "Smartphone Galaxy Pro", price: "R$ 1.299", change: "-R$ 50", status: "Perdendo Buy Box" },
                      { competitor: "MegaEletronicos", product: "Fone Bluetooth Premium", price: "R$ 189", change: "+R$ 10", status: "Ganhando Buy Box" },
                      { competitor: "DigitalMart", product: "Carregador Wireless", price: "R$ 79", change: "=", status: "Preço Estável" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="font-medium">{item.competitor}</div>
                          <div className="text-sm text-gray-400">{item.product}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{item.price}</div>
                          <div className={`text-sm ${item.change.includes('-') ? 'text-red-400' : item.change.includes('+') ? 'text-green-400' : 'text-gray-400'}`}>
                            {item.change}
                          </div>
                        </div>
                        <Badge variant={item.status.includes('Perdendo') ? 'destructive' : item.status.includes('Ganhando') ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Insights da IA
                  </CardTitle>
                  <CardDescription>Análises avançadas e recomendações personalizadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="font-medium text-purple-400 mb-2">Previsão de Demanda</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Com base no histórico e tendências, prevemos aumento de 40% nas vendas de smartphones na próxima semana.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Aumentar Estoque
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-500 text-purple-400">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Otimização de Preços</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Ajustando os preços de 12 produtos, você pode aumentar a margem em R$ 2.340/mês mantendo a competitividade.
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Aplicar Sugestões
                    </Button>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">Oportunidades de Cross-sell</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Clientes que compram "Smartphone Galaxy" têm 73% de chance de comprar "Capa Protetora". Configure ofertas automáticas.
                    </p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Criar Ofertas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Funcionalidades Completas</h3>
            <p className="text-gray-400 text-lg">Tudo que você precisa para vender mais e trabalhar menos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Análise de Performance com IA",
                description: "Identifica produtos com queda nas vendas, problemas de entrega e baixa conversão automaticamente."
              },
              {
                icon: Target,
                title: "Ações Recomendadas",
                description: "A IA sugere ajustes de preço, título, imagens e estoque para aumentar seus resultados."
              },
              {
                icon: Users,
                title: "Monitor de Concorrentes",
                description: "Acompanhe automaticamente preços, Buy Box e estratégias dos seus concorrentes."
              },
              {
                icon: Package,
                title: "Gestão Inteligente de Estoque",
                description: "Previsão de reposição automática com alertas para não perder vendas."
              },
              {
                icon: MessageSquare,
                title: "Mensageria Automatizada",
                description: "Envio automático de mensagens pós-venda e feedback com templates otimizados."
              },
              {
                icon: Star,
                title: "Nota Sellion",
                description: "Sistema de pontuação que mostra a saúde geral da sua operação em tempo real."
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-blue-400 mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Planos que Cabem no Seu Bolso</h3>
            <p className="text-gray-400 text-lg">Comece grátis e escale conforme cresce</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Mensal</span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingPeriod === 'annual' ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'annual' ? 'text-white' : 'text-gray-400'}`}>
                Anual
                <Badge className="ml-2 bg-green-600 text-white text-xs">-40%</Badge>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="bg-gray-800/50 border-gray-700 relative">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Perfeito para começar</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  {billingPeriod === 'monthly' ? (
                    <>
                      R$ 89,90
                      <span className="text-lg font-normal text-gray-400">/mês</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-normal text-gray-400 line-through">R$ 1.078,80</span>
                        <Badge className="bg-green-600 text-white text-xs">-40%</Badge>
                      </div>
                      R$ 647,28
                      <span className="text-lg font-normal text-gray-400">/ano</span>
                      <div className="text-sm text-green-400 mt-1">R$ 53,94/mês</div>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Painel de controle unificado",
                    "Integração com 1 marketplace",
                    "Análises básicas de performance",
                    "Alertas de estoque baixo",
                    "Suporte por email"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600"
                  onClick={() => router.push("/register")}
                >
                  Começar Teste Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gray-800/50 border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Mais Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>Para vendedores sérios</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  {billingPeriod === 'monthly' ? (
                    <>
                      R$ 189,90
                      <span className="text-lg font-normal text-gray-400">/mês</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-normal text-gray-400 line-through">R$ 2.278,80</span>
                        <Badge className="bg-green-600 text-white text-xs">-40%</Badge>
                      </div>
                      R$ 1.367,28
                      <span className="text-lg font-normal text-gray-400">/ano</span>
                      <div className="text-sm text-green-400 mt-1">R$ 113,94/mês</div>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Tudo do plano Starter",
                    "Integração com até 3 marketplaces",
                    "IA de performance avançada",
                    "Monitor de concorrência",
                    "Alertas inteligentes",
                    "Mensageria automatizada",
                    "Suporte prioritário"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => router.push("/register")}
                >
                  Começar Teste Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Master Plan */}
            <Card className="bg-gray-800/50 border-gray-700 relative">
              <CardHeader>
                <CardTitle className="text-xl">Master</CardTitle>
                <CardDescription>Para grandes operações</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  {billingPeriod === 'monthly' ? (
                    <>
                      R$ 349,90
                      <span className="text-lg font-normal text-gray-400">/mês</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-normal text-gray-400 line-through">R$ 4.198,80</span>
                        <Badge className="bg-green-600 text-white text-xs">-40%</Badge>
                      </div>
                      R$ 2.519,28
                      <span className="text-lg font-normal text-gray-400">/ano</span>
                      <div className="text-sm text-green-400 mt-1">R$ 209,94/mês</div>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Tudo do plano Pro",
                    "Integração ilimitada",
                    "Relatórios automáticos",
                    "IA preditiva de estoque",
                    "API personalizada",
                    "Gerente de conta dedicado",
                    "Suporte 24/7"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => router.push("/register")}
                >
                  Começar Teste Grátis
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              <Shield className="w-4 h-4 inline mr-1" />
              7 dias grátis • Cancele quando quiser • Sem taxa de setup
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-4xl font-bold mb-6">
            Pronto para Vender Mais com
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Inteligência</span>?
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de vendedores que já aumentaram suas vendas com o Sellion.
            Teste grátis por 7 dias, sem compromisso.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
            onClick={() => router.push("/register")}
          >
            Começar Agora - É Grátis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Sellion
                </h4>
              </div>
              <p className="text-gray-400 text-sm">
                O assistente de vendas mais inteligente para marketplaces da América Latina.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Produto</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Funcionalidades</div>
                <div>Preços</div>
                <div>Integrações</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Suporte</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Central de Ajuda</div>
                <div>Documentação</div>
                <div>Contato</div>
                <div>Status</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-4">Empresa</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Sobre</div>
                <div>Blog</div>
                <div>Carreiras</div>
                <div>Privacidade</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Sellion. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
