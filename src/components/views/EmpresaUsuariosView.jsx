
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { mockUsers } from '@/lib/mockData';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  MoreVertical,
  UserCheck,
  UserX,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const UserCard = ({ user, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Ausente';
      case 'busy': return 'Ocupado';
      default: return 'Offline';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Gerente': return 'bg-purple-500/20 text-purple-300';
      case 'Supervisor': return 'bg-blue-500/20 text-blue-300';
      case 'Atendente': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{user.name}</h3>
            <p className="text-white/60 text-sm">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
              <span className="text-white/50 text-xs">• {user.department}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Edit size={14} />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <MoreVertical size={14} />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
            <span>{getStatusText(user.status)}</span>
          </div>
          <span>Último acesso: {user.lastSeen.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Mail size={14} />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Phone size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-white/70 text-sm">{title}</p>
        {subtitle && (
          <p className="text-white/50 text-xs mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  </motion.div>
);

export default function EmpresaUsuariosView() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const onlineUsers = users.filter(user => user.status === 'online').length;
  const totalUsers = users.length;

  return (
    <MainContent 
      title="Usuários da Empresa" 
      subtitle="Gerencie usuários, permissões e equipes"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total de Usuários"
            value={totalUsers}
            subtitle="Ativos na plataforma"
            color="bg-blue-500"
          />
          <StatCard
            icon={UserCheck}
            title="Usuários Online"
            value={onlineUsers}
            subtitle="Conectados agora"
            color="bg-green-500"
          />
          <StatCard
            icon={Shield}
            title="Administradores"
            value={users.filter(u => u.role === 'Gerente').length}
            subtitle="Com acesso total"
            color="bg-purple-500"
          />
          <StatCard
            icon={UserX}
            title="Inativos"
            value="2"
            subtitle="Últimos 30 dias"
            color="bg-red-500"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-full md:w-64"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="all">Todas as funções</option>
              <option value="Gerente">Gerente</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Atendente">Atendente</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="all">Todos os status</option>
              <option value="online">Online</option>
              <option value="away">Ausente</option>
              <option value="busy">Ocupado</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Filter size={16} className="mr-2" />
              Filtros Avançados
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Plus size={16} className="mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-white/60">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Performance da Equipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">4.8</div>
              <p className="text-white/70 text-sm">Avaliação Média</p>
              <p className="text-white/50 text-xs mt-1">Satisfação do cliente</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">2m 34s</div>
              <p className="text-white/70 text-sm">Tempo Médio</p>
              <p className="text-white/50 text-xs mt-1">Primeira resposta</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
              <p className="text-white/70 text-sm">Taxa de Resolução</p>
              <p className="text-white/50 text-xs mt-1">Primeiro contato</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainContent>
  );
}
