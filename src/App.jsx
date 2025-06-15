import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import DashboardView from '@/components/views/DashboardView';
import AtendimentoView from '@/components/views/AtendimentoView';
import AiTrainingView from '@/components/views/AiTrainingView';
import EmpresaUsuariosView from '@/components/views/EmpresaUsuariosView';
import AdminPanelView from '@/components/views/AdminPanelView';
import EmpresaConfiguracoesView from '@/components/views/EmpresaConfiguracoesView';
import LoginView from '@/components/views/LoginView';
import SuperAdminLoginView from '@/components/views/SuperAdminLoginView';
import SuperAdminDashboardView from '@/components/views/SuperAdminDashboardView';
import SettingsView from '@/components/views/settings/SettingsView';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'superAdmin' ? '/superadmin' : '/'} />;
  }

  return children;
};

const SuperAdminRoute = ({ children }) => {
  return <ProtectedRoute role="superAdmin">{children}</ProtectedRoute>;
};

const AdminEmpresaRoute = ({ children }) => {
  return <ProtectedRoute role="adminEmpresa">{children}</ProtectedRoute>;
};

const AtendenteRoute = ({ children }) => {
  return <ProtectedRoute role="atendente">{children}</ProtectedRoute>;
};


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen gradient-bg">
          <AppRoutes />
          <Toaster />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/login-master" element={<SuperAdminLoginView />} />

      <Route path="/superadmin" element={<SuperAdminRoute><SuperAdminDashboardView /></SuperAdminRoute>} />

      <Route path="/" element={
        user ? (
          user.role === 'superAdmin' ? <Navigate to="/superadmin" /> :
          user.role === 'adminEmpresa' ? <AdminEmpresaRoute><DashboardView /></AdminEmpresaRoute> :
          <AtendenteRoute><AtendimentoView /></AtendenteRoute>
        ) : <Navigate to="/login" />
      } />
      <Route path="/empresa/:empresaSlug/dashboard" element={<AdminEmpresaRoute><DashboardView /></AdminEmpresaRoute>} />
      <Route path="/usuarios" element={<AdminEmpresaRoute><EmpresaUsuariosView /></AdminEmpresaRoute>} />
      <Route path="/configuracoes" element={<AdminEmpresaRoute><EmpresaConfiguracoesView /></AdminEmpresaRoute>} />
      <Route path="/admin" element={<AdminEmpresaRoute><AdminPanelView /></AdminEmpresaRoute>} />
      
      <Route path="/atendimento" element={<AtendenteRoute><AtendimentoView /></AtendenteRoute>} />
      <Route path="/empresa/:empresaSlug/atendimento" element={<AtendenteRoute><AtendimentoView /></AtendenteRoute>} />
      
      <Route path="/ia" element={<ProtectedRoute><AiTrainingView /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsView /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to={user ? (user.role === 'superAdmin' ? '/superadmin' : '/') : '/login'} />} />
    </Routes>
  );
}