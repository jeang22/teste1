import React, { useState } from 'react';
import { Palette, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SettingSection } from './SettingSection';

export default function AppearanceSettings({ icon, title }) {
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  });

  const handleSaveAppearance = () => {
    toast({
      title: "Aparência atualizada!",
      description: "Suas preferências de aparência foram salvas.",
    });
  };

  return (
    <SettingSection icon={icon || Palette} title={title || "Aparência"}>
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
  );
}