import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  Building, 
  Plus, 
  Search, 
  Users, 
  Settings, 
  BarChart, 
  ShieldCheck,
  Edit,
  Trash2,
  DollarSign,
  Activity
} from 'lucide-react';

const mockEmpresas = [
  { id: '1', nome: 'Loja XPTO', plano: 'Pro', cnpj: '12.345.678/0001-99', adminEmail: 'admin@xpto.com', status: 'active', users: 15, atendimentos: 2300 },
  { id: '2', nome: 'Tech Solutions', plano: 'Enterprise', cnpj: '98.765.432/0001-11', adminEmail: 'admin@tech.com', status: 'active', users: 50, atendimentos: 12500 },
  { id: '3', nome: 'Consultoria ABC', plano: 'Basic', cnpj: '55.555.555/0001-55', adminEmail: 'admin@abc.com', status: 'inactive', users: 5, atendimentos: 300 },
  { id: '4', nome: 'Marketing Digital Max', plano: 'Pro', cnpj: '22.333.444/0001-88', adminEmail: 'admin@maxmarketing.com', status: 'active', users: 22, atendimentos: 5200 },
];

const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 card-hover"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={28} />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-white/80 text-sm">{title}</p>
    {subtitle && <p className="text-white/60 text-xs mt-1">{subtitle}</p>}
  </motion.div>
);

const EmpresaRow = ({ empresa, onEdit, onDelete }) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="border-b border-white/10 hover:bg-white/5 transition-colors"
  >
    <td className="px-6 py-4 text-white">{empresa.nome}</td>
    <td className="px-6 py-4 text-white/80">{empresa.cnpj}</td>
    <td className="px-6 py-4 text-white/80">{empresa.plano}</td>
    <td className="px-6 py-4 text-white/80">{empresa.adminEmail}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        empresa.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
      }`}>
        {empresa.status === 'active' ? 'Ativa' : 'Inativa'}
      </span>
    </td>
    <td className="px-6 py-4 text-white/80 text-center">{empresa.users}</td>
    <td className="px-6 py-4 text-white/80 text-center">{empresa.atendimentos}</td>
    <td className="px-6 py-4 text-right">
      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mr-2" onClick={() => onEdit(empresa)}>
        <Edit size={16} />
      </Button>
      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/20 hover:text-red-300" onClick={() => onDelete(empresa.id)}>
        <Trash2 size={16} />
      </Button>
    </td>
  </motion.tr>
);

export default function SuperAdminDashboardView() {
  const [empresas, setEmpresas] = useState(mockEmpresas);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateEmpresa = () => {
    toast({ 
      title: "Nova Empresa", 
      description: "🚧 Funcionalidade de criar nova empresa ainda não implementada.",
      className: "bg-blue-500 text-white border-blue-600"
    });
  };

  const handleEditEmpresa = (empresa) => {
    toast({ 
      title: "Editar Empresa", 
      description: `🚧 Funcionalidade de editar empresa ${empresa.nome} ainda não implementada.`,
      className: "bg-yellow-500 text-white border-yellow-600"
    });
  };

  const handleDeleteEmpresa = (empresaId) => {
    toast({ 
      title: "Excluir Empresa", 
      description: `🚧 Funcionalidade de excluir empresa ID ${empresaId} ainda não implementada.`,
      variant: "destructive"
    });
  };
  
  const filteredEmpresas = empresas.filter(emp => 
    emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.cnpj.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmpresas = empresas.length;
  const empresasAtivas = empresas.filter(e => e.status === 'active').length;
  const totalUsuarios = empresas.reduce((sum, e) => sum + e.users, 0);
  const totalAtendimentos = empresas.reduce((sum, e) => sum + e.atendimentos, 0);

  return (
    <MainContent title="Painel Super Admin" subtitle="Gerenciamento Global da Plataforma">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Building} title="Total de Empresas" value={totalEmpresas} color="bg-blue-500" />
          <StatCard icon={ShieldCheck} title="Empresas Ativas" value={empresasAtivas} color="bg-green-500" />
          <StatCard icon={Users} title="Total de Usuários" value={totalUsuarios.toLocaleString()} color="bg-purple-500" />
          <StatCard icon={Activity} title="Total de Atendimentos" value={totalAtendimentos.toLocaleString()} color="bg-orange-500" />
        </div>

        {/* Empresas Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-white">Empresas Cadastradas</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type="text"
                  placeholder="Buscar empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
              </div>
              <Button 
                onClick={handleCreateEmpresa}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={18} className="mr-2" />
                Nova Empresa
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Nome</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">CNPJ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Plano</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Admin Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Usuários</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Atendimentos</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredEmpresas.length > 0 ? (
                  filteredEmpresas.map(empresa => (
                    <EmpresaRow key={empresa.id} empresa={empresa} onEdit={handleEditEmpresa} onDelete={handleDeleteEmpresa} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-white/60">Nenhuma empresa encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Additional Admin Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -5 }} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center cursor-pointer" onClick={() => toast({title: "🚧 Não implementado"})}>
            <BarChart className="mx-auto text-green-400 mb-3" size={32} />
            <h3 className="text-lg font-semibold text-white">Relatórios Gerais</h3>
            <p className="text-white/70 text-sm">Visualizar estatísticas da plataforma.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center cursor-pointer" onClick={() => toast({title: "🚧 Não implementado"})}>
            <Settings className="mx-auto text-blue-400 mb-3" size={32} />
            <h3 className="text-lg font-semibold text-white">Configurações Globais</h3>
            <p className="text-white/70 text-sm">Ajustar parâmetros do sistema.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center cursor-pointer" onClick={() => toast({title: "🚧 Não implementado"})}>
            <DollarSign className="mx-auto text-yellow-400 mb-3" size={32} />
            <h3 className="text-lg font-semibold text-white">Gerenciar Planos</h3>
            <p className="text-white/70 text-sm">Configurar planos e assinaturas.</p>
          </motion.div>
        </div>
      </div>
    </MainContent>
  );
}