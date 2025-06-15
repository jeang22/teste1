
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SettingSection = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-white/20 rounded-lg">
        <Icon className="text-white" size={20} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default function SettingsView() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userSettings, setUserSettings] = useState({
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '+55 11 99999-9999',
    department: 'Suporte',
    role: 'Administrador',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  });

  const [notifications, setNotifications] = useState({
    newMessages: true,
    urgentMessages: true,
    dailyReports: false,
    systemUpdates: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas!",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Aparência atualizada!",
      description: "Suas preferências de aparência foram salvas.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <MainContent 
      title="Configurações" 
      subtitle="Gerencie suas preferências pessoais e configurações de conta"
    >
      <div className="space-y-6">
        {/* Profile Settings */}
        <SettingSection icon={User} title="Perfil do Usuário">
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              <img
                src={userSettings.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                <Upload size={12} />
              </Button>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">{userSettings.name}</h4>
              <p className="text-white/60 text-sm mb-2">{userSettings.role} • {userSettings.department}</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                Alterar Foto
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Nome Completo</label>
              <input
                type="text"
                value={userSettings.name}
                onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Telefone</label>
              <input
                type="tel"
                value={userSettings.phone}
                onChange={(e) => setUserSettings({...userSettings, phone: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Departamento</label>
              <select
                value={userSettings.department}
                onChange={(e) => setUserSettings({...userSettings, department: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="Suporte">Suporte</option>
                <option value="Vendas">Vendas</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Administração">Administração</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save size={16} className="mr-2" />
              Salvar Perfil
            </Button>
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection icon={Shield} title="Segurança">
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-medium mb-4">Alterar Senha</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Senha Atual</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nova Senha</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Confirmar Senha</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleChangePassword}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Alterar Senha
              </Button>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h4 className="text-white font-medium mb-4">Sessões Ativas</h4>
              <div className="space-y-3">
                {[
                  { device: 'Chrome - Windows', location: 'São Paulo, Brasil', current: true, time: 'Agora' },
                  { device: 'Safari - iPhone', location: 'São Paulo, Brasil', current: false, time: '2h atrás' },
                  { device: 'Firefox - Linux', location: 'Rio de Janeiro, Brasil', current: false, time: '1d atrás' }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="text-white font-medium text-sm">{session.device}</p>
                      <p className="text-white/60 text-xs">{session.location} • {session.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.current && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                          Atual
                        </span>
                      )}
                      {!session.current && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-300 hover:bg-red-500/20"
                          onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
                        >
                          Encerrar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection icon={Bell} title="Notificações">
          <div className="space-y-4">
            {[
              { key: 'newMessages', label: 'Novas mensagens', description: 'Receber notificações de novas conversas' },
              { key: 'urgentMessages', label: 'Mensagens urgentes', description: 'Alertas para mensagens de alta prioridade' },
              { key: 'dailyReports', label: 'Relatórios diários', description: 'Resumo diário de atividades' },
              { key: 'systemUpdates', label: 'Atualizações do sistema', description: 'Notificações sobre atualizações e manutenção' },
              { key: 'emailNotifications', label: 'Notificações por email', description: 'Receber notificações no seu email' },
              { key: 'pushNotifications', label: 'Notificações push', description: 'Notificações no navegador' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white font-medium">{setting.label}</h4>
                  <p className="text-white/60 text-sm">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications[setting.key]}
                    onChange={(e) => setNotifications({...notifications, [setting.key]: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSaveNotifications}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save size={16} className="mr-2" />
              Salvar Notificações
            </Button>
          </div>
        </SettingSection>

        {/* Appearance Settings */}
        <SettingSection icon={Palette} title="Aparência">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Tema</label>
              <select
                value={appearance.theme}
                onChange={(e) => setAppearance({...appearance, theme: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="dark">Escuro</option>
                <option value="light">Claro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Idioma</label>
              <select
                value={appearance.language}
                onChange={(e) => setAppearance({...appearance, language: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Fuso Horário</label>
              <select
                value={appearance.timezone}
                onChange={(e) => setAppearance({...appearance, timezone: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                <option value="America/New_York">Nova York (GMT-5)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Formato de Data</label>
              <select
                value={appearance.dateFormat}
                onChange={(e) => setAppearance({...appearance, dateFormat: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                <option value="YYYY-MM-DD">AAAA-MM-DD</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSaveAppearance}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save size={16} className="mr-2" />
              Salvar Aparência
            </Button>
          </div>
        </SettingSection>

        {/* Data Management */}
        <SettingSection icon={Download} title="Gerenciamento de Dados">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <h4 className="text-white font-medium">Exportar Dados</h4>
                <p className="text-white/60 text-sm">Baixe uma cópia dos seus dados pessoais</p>
              </div>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                <Download size={16} className="mr-2" />
                Exportar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div>
                <h4 className="text-red-300 font-medium">Excluir Conta</h4>
                <p className="text-white/60 text-sm">Remover permanentemente sua conta e dados</p>
              </div>
              <Button 
                variant="outline" 
                className="border-red-500/20 text-red-300 hover:bg-red-500/20"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                <Trash2 size={16} className="mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        </SettingSection>
      </div>
    </MainContent>
  );
}
