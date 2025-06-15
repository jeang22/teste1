
export const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'Atendente',
    status: 'online',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastSeen: new Date(),
    department: 'Suporte'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    role: 'Supervisor',
    status: 'away',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    lastSeen: new Date(Date.now() - 300000),
    department: 'Vendas'
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos@empresa.com',
    role: 'Gerente',
    status: 'busy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastSeen: new Date(Date.now() - 600000),
    department: 'Administração'
  }
];

export const mockConversations = [
  {
    id: 1,
    clientName: 'Ana Costa',
    clientEmail: 'ana@cliente.com',
    platform: 'WhatsApp',
    status: 'active',
    priority: 'high',
    lastMessage: 'Preciso de ajuda com meu pedido',
    lastMessageTime: new Date(Date.now() - 120000),
    unreadCount: 3,
    assignedTo: 1,
    tags: ['urgente', 'pedido'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    clientName: 'Pedro Mendes',
    clientEmail: 'pedro@cliente.com',
    platform: 'Telegram',
    status: 'waiting',
    priority: 'medium',
    lastMessage: 'Obrigado pelo atendimento!',
    lastMessageTime: new Date(Date.now() - 300000),
    unreadCount: 0,
    assignedTo: 2,
    tags: ['resolvido'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    clientName: 'Lucia Ferreira',
    clientEmail: 'lucia@cliente.com',
    platform: 'Instagram',
    status: 'closed',
    priority: 'low',
    lastMessage: 'Gostaria de saber sobre os produtos',
    lastMessageTime: new Date(Date.now() - 900000),
    unreadCount: 1,
    assignedTo: 3,
    tags: ['informação'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockMessages = [
  {
    id: 1,
    conversationId: 1,
    sender: 'client',
    content: 'Olá! Preciso de ajuda com meu pedido #12345',
    timestamp: new Date(Date.now() - 600000),
    type: 'text'
  },
  {
    id: 2,
    conversationId: 1,
    sender: 'agent',
    content: 'Olá Ana! Claro, vou verificar seu pedido agora mesmo.',
    timestamp: new Date(Date.now() - 580000),
    type: 'text'
  },
  {
    id: 3,
    conversationId: 1,
    sender: 'client',
    content: 'O produto ainda não chegou e já faz 5 dias',
    timestamp: new Date(Date.now() - 560000),
    type: 'text'
  },
  {
    id: 4,
    conversationId: 1,
    sender: 'ai',
    content: 'Sugestão de resposta: "Entendo sua preocupação. Vou rastrear seu pedido imediatamente e te dar uma posição."',
    timestamp: new Date(Date.now() - 540000),
    type: 'suggestion'
  },
  {
    id: 5,
    conversationId: 1,
    sender: 'agent',
    content: 'Entendo sua preocupação. Vou rastrear seu pedido imediatamente e te dar uma posição.',
    timestamp: new Date(Date.now() - 520000),
    type: 'text'
  },
  {
    id: 6,
    conversationId: 1,
    sender: 'client',
    content: 'Obrigada! Aguardo o retorno.',
    timestamp: new Date(Date.now() - 120000),
    type: 'text'
  }
];

export const mockAiTrainingData = [
  {
    id: 1,
    category: 'Saudações',
    phrases: [
      'Olá! Como posso ajudar?',
      'Bom dia! Em que posso ser útil?',
      'Oi! Estou aqui para te ajudar.',
      'Seja bem-vindo! Como posso te auxiliar?'
    ],
    confidence: 95,
    lastTrained: new Date(Date.now() - 86400000)
  },
  {
    id: 2,
    category: 'Problemas de Entrega',
    phrases: [
      'Vou verificar o status da sua entrega',
      'Entendo sua preocupação com o prazo',
      'Vou rastrear seu pedido imediatamente',
      'Peço desculpas pelo atraso na entrega'
    ],
    confidence: 88,
    lastTrained: new Date(Date.now() - 172800000)
  },
  {
    id: 3,
    category: 'Informações de Produto',
    phrases: [
      'Este produto possui as seguintes características',
      'Temos disponível em estoque',
      'O prazo de entrega é de 3-5 dias úteis',
      'O valor do produto é R$ X,XX'
    ],
    confidence: 92,
    lastTrained: new Date(Date.now() - 259200000)
  }
];

export const mockDashboardStats = {
  totalConversations: 1247,
  activeConversations: 23,
  resolvedToday: 89,
  averageResponseTime: '2m 34s',
  customerSatisfaction: 4.8,
  aiAccuracy: 94,
  monthlyGrowth: 12.5,
  topAgents: [
    { name: 'João Silva', resolved: 45, rating: 4.9 },
    { name: 'Maria Santos', resolved: 38, rating: 4.8 },
    { name: 'Carlos Oliveira', resolved: 32, rating: 4.7 }
  ]
};

export const mockPlatforms = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '📱', color: '#25D366', active: true },
  { id: 'telegram', name: 'Telegram', icon: '✈️', color: '#0088cc', active: true },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F', active: true },
  { id: 'facebook', name: 'Facebook', icon: '👥', color: '#1877F2', active: false },
  { id: 'email', name: 'Email', icon: '📧', color: '#EA4335', active: true }
];

export const mockSectors = [
  { id: 1, name: 'Suporte Técnico', description: 'Problemas técnicos e bugs' },
  { id: 2, name: 'Vendas', description: 'Informações sobre produtos e vendas' },
  { id: 3, name: 'Financeiro', description: 'Questões de pagamento e cobrança' },
  { id: 4, name: 'Entrega', description: 'Rastreamento e problemas de entrega' }
];

export const mockProblemTypes = [
  { id: 1, name: 'Produto Defeituoso', sector: 'Suporte Técnico', priority: 'high' },
  { id: 2, name: 'Atraso na Entrega', sector: 'Entrega', priority: 'medium' },
  { id: 3, name: 'Dúvida sobre Produto', sector: 'Vendas', priority: 'low' },
  { id: 4, name: 'Problema no Pagamento', sector: 'Financeiro', priority: 'high' },
  { id: 5, name: 'Cancelamento de Pedido', sector: 'Vendas', priority: 'medium' }
];
