import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Brain, 
  Users, 
  Settings, 
  Shield,
  Building,
  LogOut,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
      className: "bg-blue-500 text-white border-blue-600"
    });
  };

  let menuItems = [];
  let userDisplayName = "Usuário";
  let userRoleDisplay = "Cargo";
  let userInitials = "U";

  if (user) {
    userDisplayName = user.name || (user.email ? user.email.split('@')[0] : "Usuário");
    userInitials = userDisplayName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

    switch (user.role) {
      case 'superAdmin':
        userRoleDisplay = "Super Admin";
        menuItems = [
          { path: '/superadmin', icon: LayoutDashboard, label: 'Dashboard Global' },
          { path: '/superadmin/empresas', icon: Briefcase, label: 'Empresas' },
          { path: '/superadmin/configuracoes', icon: Settings, label: 'Config. Plataforma' },
        ];
        break;
      case 'adminEmpresa':
        userRoleDisplay = "Admin Empresa";
        // Assuming empresaSlug is available in user object or can be derived
        const empresaSlug = user.empresaSlug || 'minha-empresa'; 
        menuItems = [
          { path: `/empresa/${empresaSlug}/dashboard`, icon: LayoutDashboard, label: 'Dashboard Empresa' },
          { path: '/atendimento', icon: MessageSquare, label: 'Atendimento' }, // Could be /empresa/:slug/atendimento
          { path: '/ia', icon: Brain, label: 'IA & Treinamento' },
          { path: '/usuarios', icon: Users, label: 'Usuários Empresa' },
          { path: '/configuracoes', icon: Building, label: 'Config. Empresa' },
          { path: '/settings', icon: Settings, label: 'Minhas Configurações' }
        ];
        break;
      case 'atendente':
        userRoleDisplay = "Atendente";
        menuItems = [
          { path: '/atendimento', icon: MessageSquare, label: 'Atendimento' },
          { path: '/settings', icon: Settings, label: 'Minhas Configurações' }
        ];
        break;
      default:
        menuItems = [ { path: '/', icon: LayoutDashboard, label: 'Dashboard' } ];
    }
  } else { // Fallback for when user is not yet defined (e.g. during initial load)
     menuItems = [ { path: '/login', icon: LayoutDashboard, label: 'Login' } ];
  }


  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-64 sidebar-gradient shadow-2xl flex flex-col h-screen sticky top-0"
    >
      <div className="p-6 border-b border-white/20">
        <Link to={user ? (user.role === 'superAdmin' ? '/superadmin' : '/') : '/login'} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Via Atendimento</h1>
            <p className="text-white/70 text-sm">Sistema de IA</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/25 text-white shadow-lg font-semibold' 
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{userDisplayName}</p>
              <p className="text-white/70 text-xs truncate">{userRoleDisplay}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}