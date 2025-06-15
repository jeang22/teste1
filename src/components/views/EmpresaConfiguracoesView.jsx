
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { mockPlatforms, mockSectors, mockProblemTypes } from '@/lib/mockData';
import { 
  Building, 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  Globe,
  MessageSquare,
  Users,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ConfigSection = ({ icon: Icon, title, children }) => (
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

const PlatformCard = ({ platform, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
    <div className="flex items-center gap-3">
      <div className="text-2xl">{platform.icon}</div>
      <div>
        <h4 className="text-white font-medium">{platform.name}</h4>
        <p className="text-white/60 text-sm">Integração de mensagens</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
        platform.active ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
      }`}>
        {platform.active ? 'Ativo' : 'Inativo'}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-white hover:bg-white/10"
        onClick={() => onToggle(platform.id)}
      >
        {platform.active ? 'Desativar' : 'Ativar'}
      </Button>
    </div>
  </div>
);

const SectorCard = ({ sector, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
    <div>
      <h4 className="text-white font-medium">{sector.name}</h4>
      <p className="text-white/60 text-sm">{sector.description}</p>
    </div>
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-white hover:bg-white/10"
        onClick={() => onEdit(sector)}
      >
        <Edit size={14} />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="text-red-300 hover:bg-red-500/20"
        onClick={() => onDelete(sector.id)}
      >
        <Trash2 size={14} />
      </Button>
    </div>
  </div>
);

export default function EmpresaConfiguracoesView() {
  const [platforms, setPlatforms] = useState(mockPlatforms);
  const [sectors] = useState(mockSectors);
  const [problemTypes] = useState(mockProblemTypes);
  const [showApiKey, setShowApiKey] = useState(false);

  const [companySettings, setCompanySettings] = useState({
    name: 'Via Atendimento Ltda',
    email: 'contato@viaatendimento.com',
    phone: '+55 11 99999-9999',
    website: 'https://viaatendimento.com',
    address: 'Rua das Empresas, 123 - São Paulo, SP',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR'
  });

  const handleTogglePlatform = (platformId) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, active: !p.active } : p
    ));
    toast({
      title: "Plataforma atualizada!",
      description: "As configurações foram salvas com sucesso.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas!",
      description: "Todas as alterações foram aplicadas com sucesso.",
    });
  };

  return (
    <MainContent 
      title="Configurações da Empresa" 
      subtitle="Gerencie configurações, integrações e preferências"
    >
      <div className="space-y-6">
        {/* Company Information */}
        <ConfigSection icon={Building} title="Informações da Empresa">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Nome da Empresa</label>
              <input
                type="text"
                value={companySettings.name}
                onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                value={companySettings.email}
                onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Telefone</label>
              <input
                type="tel"
                value={companySettings.phone}
                onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Website</label>
              <input
                type="url"
                value={companySettings.website}
                onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm mb-2">Endereço</label>
              <input
                type="text"
                value={companySettings.address}
                onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save size={16} className="mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </ConfigSection>

        {/* Platform Integrations */}
        <ConfigSection icon={MessageSquare} title="Integrações de Plataformas">
          <div className="space-y-3">
            {platforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                onToggle={handleTogglePlatform}
              />
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="text-blue-300 font-medium mb-2">Configuração de API</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-white/70 text-sm mb-2">Chave da API</label>
                <div className="flex gap-2">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value="sk-1234567890abcdef..."
                    readOnly
                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                Regenerar Chave
              </Button>
            </div>
          </div>
        </ConfigSection>

        {/* Sectors Management */}
        <ConfigSection icon={Users} title="Setores de Atendimento">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white/70">Gerencie os setores para organizar o atendimento</p>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Plus size={16} className="mr-2" />
              Novo Setor
            </Button>
          </div>
          <div className="space-y-3">
            {sectors.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                onEdit={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
                onDelete={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              />
            ))}
          </div>
        </ConfigSection>

        {/* Notification Settings */}
        <ConfigSection icon={Bell} title="Configurações de Notificação">
          <div className="space-y-4">
            {[
              { label: 'Novas mensagens', description: 'Receber notificações de novas conversas' },
              { label: 'Mensagens urgentes', description: 'Alertas para mensagens de alta prioridade' },
              { label: 'Relatórios diários', description: 'Resumo diário de atividades' },
              { label: 'Atualizações do sistema', description: 'Notificações sobre atualizações e manutenção' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white font-medium">{setting.label}</h4>
                  <p className="text-white/60 text-sm">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            ))}
          </div>
        </ConfigSection>

        {/* Security Settings */}
        <ConfigSection icon={Shield} title="Configurações de Segurança">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Autenticação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Autenticação de dois fatores</span>
                  <Button 
                    size="sm" 
                variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
                  >
                    Configurar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Sessões ativas</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
                  >
                    Gerenciar
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Logs de Acesso</h4>
              <div className="space-y-2">
                {[
                  { user: 'João Silva', action: 'Login', time: '14:30' },
                  { user: 'Maria Santos', action: 'Logout', time: '14:15' },
                  { user: 'Carlos Oliveira', action: 'Login', time: '13:45' }
                ].map((log, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded text-sm">
                    <span className="text-white">{log.user}</span>
                    <span className="text-white/60">{log.action}</span>
                    <span className="text-white/50">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ConfigSection>

        {/* System Preferences */}
        <ConfigSection icon={Settings} title="Preferências do Sistema">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Fuso Horário</label>
              <select
                value={companySettings.timezone}
                onChange={(e) => setCompanySettings({...companySettings, timezone: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                <option value="America/New_York">Nova York (GMT-5)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Idioma</label>
              <select
                value={companySettings.language}
                onChange={(e) => setCompanySettings({...companySettings, language: e.target.value})}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </ConfigSection>
      </div>
    </MainContent>
  );
}
