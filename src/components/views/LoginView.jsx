import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for regular user login
    // In a real app, this would be an API call to your backend (Supabase, Firebase, custom)
    setTimeout(() => {
      // Mock user data for demo. Replace with actual auth logic.
      let userData = null;
      if (email === "admin@empresa.com" && password === "admin123") {
        userData = { email, role: 'adminEmpresa', name: 'Admin da Empresa XPTO', empresaSlug: 'xpto-loja' };
      } else if (email === "atendente@empresa.com" && password === "atendente123") {
        userData = { email, role: 'atendente', name: 'Atendente Maria', empresaSlug: 'xpto-loja', setor: 'Suporte' };
      }

      if (userData) {
        login(userData);
        setIsLoading(false);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${userData.name}.`,
          className: "bg-green-500 text-white border-green-600",
        });
        // Redirection is handled by AppRoutes based on user role
        if (userData.role === 'adminEmpresa') {
          navigate(`/empresa/${userData.empresaSlug}/dashboard`);
        } else if (userData.role === 'atendente') {
          navigate(`/empresa/${userData.empresaSlug}/atendimento`);
        } else {
          navigate('/');
        }
      } else {
        setIsLoading(false);
        toast({
          title: "Erro de Login",
          description: "Email ou senha inválidos.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">V</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Via Atendimento</h1>
          <p className="text-white/80">Plataforma de Atendimento Inteligente</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-offset-0 focus:ring-2 cursor-pointer"
                />
                <span className="ml-2 text-white/70 cursor-pointer">Lembrar-me</span>
              </label>
              <button
                type="button"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
                onClick={() => toast({ title: "🚧 Funcionalidade não implementada", description:"Recuperação de senha será adicionada em breve."})}
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-base font-semibold tracking-wide rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Entrar
                  <ArrowRight size={20} className="ml-2" />
                </div>
              )}
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center"
          >
            <h4 className="text-blue-300 font-medium text-sm mb-2">Credenciais de Demonstração</h4>
            <div className="text-white/70 text-xs space-y-1">
              <p>Admin Empresa: admin@empresa.com / admin123</p>
              <p>Atendente: atendente@empresa.com / atendente123</p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              Não tem uma conta?{' '}
              <button
                type="button"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors inline-flex items-center"
                onClick={() => toast({ title: "🚧 Funcionalidade não implementada", description:"Criação de conta será adicionada em breve."})}
              >
                <UserPlus size={16} className="mr-1"/> Criar conta
              </button>
            </p>
            <p className="text-white/70 text-sm mt-2">
              É Super Admin?{' '}
              <Link
                to="/login-master"
                className="text-yellow-300 hover:text-yellow-200 font-medium transition-colors inline-flex items-center"
              >
                <ShieldAlert size={16} className="mr-1"/> Acesso Global
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}