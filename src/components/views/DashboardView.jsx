
import React from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { mockDashboardStats } from '@/lib/mockData';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Star,
  Brain,
  Users,
  Activity
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 card-hover"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-400">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+{trend}%</span>
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-white/70 text-sm">{title}</p>
    {subtitle && (
      <p className="text-white/50 text-xs mt-1">{subtitle}</p>
    )}
  </motion.div>
);

const AgentCard = ({ agent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
        <span className="text-white font-medium text-sm">
          {agent.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div>
        <p className="text-white font-medium">{agent.name}</p>
        <p className="text-white/60 text-sm">{agent.resolved} atendimentos</p>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <Star className="text-yellow-400" size={16} fill="currentColor" />
      <span className="text-white font-medium">{agent.rating}</span>
    </div>
  </motion.div>
);

export default function DashboardView() {
  const stats = mockDashboardStats;

  return (
    <MainContent 
      title="Dashboard" 
      subtitle="Visão geral do sistema de atendimento"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={MessageSquare}
            title="Total de Conversas"
            value={stats.totalConversations.toLocaleString()}
            subtitle="Este mês"
            color="bg-blue-500"
            trend={stats.monthlyGrowth}
          />
          <StatCard
            icon={Activity}
            title="Conversas Ativas"
            value={stats.activeConversations}
            subtitle="Agora"
            color="bg-green-500"
          />
          <StatCard
            icon={CheckCircle}
            title="Resolvidas Hoje"
            value={stats.resolvedToday}
            subtitle="Últimas 24h"
            color="bg-purple-500"
          />
          <StatCard
            icon={Clock}
            title="Tempo Médio"
            value={stats.averageResponseTime}
            subtitle="Resposta"
            color="bg-orange-500"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Star}
            title="Satisfação do Cliente"
            value={`${stats.customerSatisfaction}/5`}
            subtitle="Avaliação média"
            color="bg-yellow-500"
          />
          <StatCard
            icon={Brain}
            title="Precisão da IA"
            value={`${stats.aiAccuracy}%`}
            subtitle="Sugestões aceitas"
            color="bg-pink-500"
          />
          <StatCard
            icon={Users}
            title="Agentes Online"
            value="12"
            subtitle="De 15 total"
            color="bg-indigo-500"
          />
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Agents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-6">Top Agentes</h3>
            <div className="space-y-4">
              {stats.topAgents.map((agent, index) => (
                <AgentCard key={agent.name} agent={agent} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-6">Atividade Recente</h3>
            <div className="space-y-4">
              {[
                { action: 'Nova conversa iniciada', client: 'Ana Costa', time: '2 min atrás', type: 'new' },
                { action: 'Conversa resolvida', client: 'Pedro Mendes', time: '5 min atrás', type: 'resolved' },
                { action: 'IA sugeriu resposta', client: 'Lucia Ferreira', time: '8 min atrás', type: 'ai' },
                { action: 'Agente entrou online', client: 'Maria Santos', time: '12 min atrás', type: 'agent' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'new' ? 'bg-blue-400' :
                    activity.type === 'resolved' ? 'bg-green-400' :
                    activity.type === 'ai' ? 'bg-purple-400' : 'bg-orange-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-white/60 text-xs">{activity.client}</p>
                  </div>
                  <span className="text-white/50 text-xs">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainContent>
  );
}
