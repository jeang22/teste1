import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SettingSection } from './SettingSection';

export default function SecuritySettings({ icon, title }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <SettingSection icon={icon || Shield} title={title || "Segurança"}>
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
  );
}