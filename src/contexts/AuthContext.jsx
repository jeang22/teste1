import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('viaAtendimentoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('viaAtendimentoUser', JSON.stringify(userData));
    setUser(userData);
    // O redirecionamento agora pode ser feito aqui ou no componente de login
    // Exemplo:
    // if (userData.role === 'superAdmin') navigate('/superadmin');
    // else if (userData.role === 'adminEmpresa') navigate(`/empresa/${userData.empresaSlug}/dashboard`);
    // else if (userData.role === 'atendente') navigate(`/empresa/${userData.empresaSlug}/atendimento`);
    // else navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('viaAtendimentoUser');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};