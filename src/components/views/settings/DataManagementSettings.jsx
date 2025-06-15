import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SettingSection } from './SettingSection';

export default function DataManagementSettings({ icon, title }) {
  return (
    <SettingSection icon={icon || Download} title={title || "Gerenciamento de Dados"}>
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
  );
}