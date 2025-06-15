
import React from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { 
  Shield, 
  Database, 
  Settings, 
  Activity, 
  Users, 
  MessageSquare,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminCard = ({ icon: Icon, title, description, action, color, status }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 card-hover"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      {status && (
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-500/20 text-green-300' :
          status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
          'bg-red-500/20 text-red-300'
        }`}>
          {status === 'active' ? 'Ativo' : status === 'warning' ? 'Atenção' : 'Erro'}
        </div>
      )}
    </div>
    
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm mb-4">{description}</p>
    
    <Button 
      size="sm" 
      variant="ghost" 
      className="text-white hover:bg-white/10 w-full"
      onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
    >
      {action}
    </Button>
  </motion.div>
);

const SystemMetric = ({ label, value, status, trend }) => (
  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
    <div className="flex items-center justify-between mb-2">
      <span className="text-white/70 text-sm">{label}</span>
      <div className={`w-2 h-2 rounded-full ${
        status === 'good' ? 'bg-green-400' :
        status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
      }`}></div>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-white font-semibold text-lg">{value}</span>
      {trend && (
        <span className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
  </div>
);

const LogEntry = ({ type, message, timestamp, severity }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
  >
    <div className={`w-2 h-2 rounded-full mt-2 ${
      severity === 'error' ? 'bg-red-400' :
      severity === 'warning' ? 'bg-yellow-400' :
      severity === 'info' ? 'bg-blue-400' : 'bg-green-400'
    }`}></div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-white text-sm font-medium">{type}</span>
        <span className="text-white/50 text-xs">{timestamp}</span>
      </div>
      <p className="text-white/70 text-sm">{message}</p>
    </div>
  </motion.div>
);

export default function AdminPanelView() {
  const adminSections = [
    {
      icon: Database,
      title: "Gerenciamento de Dados",
      description: "Backup, restauração e migração de dados do sistema",
      action: "Acessar Banco de Dados",
      color: "bg-blue-500",
      status: "active"
    },
    {
      icon: Users,
      title: "Controle de Usuários",
      description: "Gerenciar permissões, roles e acesso de usuários",
      action: "Gerenciar Permissões",
      color: "bg-green-500",
      status: "active"
    },
    {
      icon: Settings,
      title: "Configurações do Sistema",
      description: "Configurações globais, integrações e APIs",
      action: "Configurar Sistema",
      color: "bg-purple-500",
      status: "warning"
    },
    {
      icon: Brain,
      title: "Configuração de IA",
      description: "Modelos, treinamento e parâmetros da inteligência artificial",
      action: "Configurar IA",
      color: "bg-pink-500",
      status: "active"
    },
    {
      icon: Activity,
      title: "Monitoramento",
      description: "Logs, métricas de performance e saúde do sistema",
      action: "Ver Relatórios",
      color: "bg-orange-500",
      status: "active"
    },
    {
      icon: Server,
      title: "Infraestrutura",
      description: "Servidores, recursos e escalabilidade do sistema",
      action: "Monitorar Servidores",
      color: "bg-indigo-500",
      status: "warning"
    }
  ];

  const systemMetrics = [
    { label: "CPU", value: "45%", status: "good", trend: -2 },
    { label: "Memória", value: "67%", status: "warning", trend: 5 },
    { label: "Disco", value: "23%", status: "good", trend: 1 },
    { label: "Rede", value: "12MB/s", status: "good", trend: 8 },
    { label: "Uptime", value: "99.9%", status: "good", trend: 0 },
    { label: "Usuários Ativos", value: "1,247", status: "good", trend: 12 }
  ];

  const recentLogs = [
    { type: "Sistema", message: "Backup automático concluído com sucesso", timestamp: "14:30", severity: "success" },
    { type: "IA", message: "Modelo de IA atualizado - versão 2.1.3", timestamp: "14:15", severity: "info" },
    { type: "Segurança", message: "Tentativa de login suspeita detectada", timestamp: "14:02", severity: "warning" },
    { type: "API", message: "Rate limit excedido para IP 192.168.1.100", timestamp: "13:45", severity: "warning" },
    { type: "Database", message: "Query lenta detectada - otimização necessária", timestamp: "13:30", severity: "error" }
  ];

  return (
    <MainContent 
      title="Painel Administrativo" 
      subtitle="Controle total do sistema e configurações avançadas"
    >
      <div className="space-y-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-green-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Status do Sistema</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Sistema Operacional</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemMetrics.map((metric, index) => (
              <SystemMetric key={index} {...metric} />
            ))}
          </div>
        </motion.div>

        {/* Admin Sections */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Ferramentas Administrativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => (
              <AdminCard key={index} {...section} />
            ))}
          </div>
        </div>

        {/* Logs and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Logs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Logs Recentes</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                Ver Todos
              </Button>
            </div>
            <div className="space-y-3">
              {recentLogs.map((log, index) => (
                <LogEntry key={index} {...log} />
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Estatísticas Rápidas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-blue-400" size={20} />
                  <span className="text-white">Mensagens Hoje</span>
                </div>
                <span className="text-white font-semibold">2,847</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="text-green-400" size={20} />
                  <span className="text-white">Usuários Ativos</span>
                </div>
                <span className="text-white font-semibold">1,247</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="text-purple-400" size={20} />
                  <span className="text-white">Precisão da IA</span>
                </div>
                <span className="text-white font-semibold">94.2%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-orange-400" size={20} />
                  <span className="text-white">Crescimento Mensal</span>
                </div>
                <span className="text-white font-semibold">+12.5%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-yellow-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Alertas de Segurança</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-400" size={16} />
                <span className="text-yellow-400 font-medium text-sm">Atenção</span>
              </div>
              <p className="text-white text-sm">3 tentativas de login falharam</p>
              <p className="text-white/60 text-xs mt-1">Última: há 15 minutos</p>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400 font-medium text-sm">Seguro</span>
              </div>
              <p className="text-white text-sm">SSL certificado válido</p>
              <p className="text-white/60 text-xs mt-1">Expira em 89 dias</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-400" size={16} />
                <span className="text-blue-400 font-medium text-sm">Backup</span>
              </div>
              <p className="text-white text-sm">Último backup: sucesso</p>
              <p className="text-white/60 text-xs mt-1">Há 2 horas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainContent>
  );
}
