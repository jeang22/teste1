import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SettingSection } from './SettingSection';

export default function ProfileSettings({ icon, title }) {
  const [userSettings, setUserSettings] = useState({
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '+55 11 99999-9999',
    department: 'Suporte',
    role: 'Administrador',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  return (
    <SettingSection icon={icon || User} title={title || "Perfil do Usuário"}>
      <div className="flex items-start gap-6 mb-6">
        <div className="relative">
          <img 
            src={userSettings.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
           src="https://images.unsplash.com/photo-1625708974337-fb8fe9af5711" />
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600 p-0"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Upload size={14} />
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
  );
}