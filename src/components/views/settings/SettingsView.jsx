import React from 'react';
import MainContent from '@/components/layout/MainContent';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';
import DataManagementSettings from './DataManagementSettings';
import { User, Shield, Bell, Palette, Download } from 'lucide-react';

const settingsSections = [
  { id: 'profile', title: 'Perfil do Usuário', icon: User, component: ProfileSettings },
  { id: 'security', title: 'Segurança', icon: Shield, component: SecuritySettings },
  { id: 'notifications', title: 'Notificações', icon: Bell, component: NotificationSettings },
  { id: 'appearance', title: 'Aparência', icon: Palette, component: AppearanceSettings },
  { id: 'data', title: 'Gerenciamento de Dados', icon: Download, component: DataManagementSettings },
];

export default function SettingsView() {
  return (
    <MainContent 
      title="Configurações" 
      subtitle="Gerencie suas preferências pessoais e configurações de conta"
    >
      <div className="space-y-6">
        {settingsSections.map(section => {
          const Component = section.component;
          return <Component key={section.id} icon={section.icon} title={section.title} />;
        })}
      </div>
    </MainContent>
  );
}