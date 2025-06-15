import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SettingSection } from './SettingSection';

const notificationOptions = [
  { key: 'newMessages', label: 'Novas mensagens', description: 'Receber notificações de novas conversas' },
  { key: 'urgentMessages', label: 'Mensagens urgentes', description: 'Alertas para mensagens de alta prioridade' },
  { key: 'dailyReports', label: 'Relatórios diários', description: 'Resumo diário de atividades' },
  { key: 'systemUpdates', label: 'Atualizações do sistema', description: 'Notificações sobre atualizações e manutenção' },
  { key: 'emailNotifications', label: 'Notificações por email', description: 'Receber notificações no seu email' },
  { key: 'pushNotifications', label: 'Notificações push', description: 'Notificações no navegador' }
];

export default function NotificationSettings({ icon, title }) {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    urgentMessages: true,
    dailyReports: false,
    systemUpdates: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas!",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  return (
    <SettingSection icon={icon || Bell} title={title || "Notificações"}>
      <div className="space-y-4">
        {notificationOptions.map((setting) => (
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
  );
}