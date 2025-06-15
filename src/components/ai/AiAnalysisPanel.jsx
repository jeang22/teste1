
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  MessageSquare,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AnalysisCard = ({ icon: Icon, title, content, color, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 rounded-lg p-4"
  >
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={16} className="text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-white text-sm mb-1">{title}</h4>
        <p className="text-white/70 text-xs mb-3">{content}</p>
        {action && (
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 h-6 px-2 text-xs"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  </motion.div>
);

const SuggestionCard = ({ suggestion, onAccept, onReject }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/20 rounded-lg p-4"
  >
    <div className="flex items-start gap-2 mb-3">
      <Brain size={16} className="text-purple-300 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-medium text-white text-sm mb-1">Sugestão da IA</h4>
        <p className="text-white/80 text-sm">{suggestion}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <Button 
        size="sm" 
        className="bg-purple-500 hover:bg-purple-600 text-white h-7 px-3 text-xs"
        onClick={onAccept}
      >
        Usar
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-white/70 hover:text-white hover:bg-white/10 h-7 px-3 text-xs"
        onClick={onReject}
      >
        Rejeitar
      </Button>
    </div>
  </motion.div>
);

export default function AiAnalysisPanel({ conversation, messages }) {
  const [suggestions] = useState([
    "Entendo sua preocupação com o atraso. Vou verificar o status do seu pedido imediatamente e te dar uma posição precisa.",
    "Peço desculpas pelo inconveniente. Vou escalar seu caso para nossa equipe especializada para uma resolução mais rápida.",
    "Posso oferecer algumas opções para resolver essa situação. Qual seria mais conveniente para você?"
  ]);

  const handleAcceptSuggestion = (suggestion) => {
    toast({
      title: "Sugestão aceita!",
      description: "A resposta foi adicionada ao campo de mensagem.",
    });
  };

  const handleRejectSuggestion = () => {
    toast({
      title: "Sugestão rejeitada",
      description: "A IA aprenderá com seu feedback.",
    });
  };

  const analysisData = [
    {
      icon: TrendingUp,
      title: "Sentimento do Cliente",
      content: "Frustrado (75%) - Cliente demonstra impaciência com atraso na entrega",
      color: "bg-orange-500",
      action: {
        label: "Ver detalhes",
        onClick: () => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })
      }
    },
    {
      icon: AlertTriangle,
      title: "Urgência",
      content: "Alta - Problema de entrega com prazo vencido há 2 dias",
      color: "bg-red-500",
      action: {
        label: "Escalar",
        onClick: () => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })
      }
    },
    {
      icon: Target,
      title: "Categoria",
      content: "Problemas de Entrega > Atraso > Pedido #12345",
      color: "bg-blue-500",
      action: {
        label: "Ver histórico",
        onClick: () => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })
      }
    },
    {
      icon: Clock,
      title: "Tempo de Resposta",
      content: "Média: 2m 15s - Dentro do SLA (3 minutos)",
      color: "bg-green-500"
    },
    {
      icon: Star,
      title: "Histórico do Cliente",
      content: "Cliente VIP - 15 compras, satisfação 4.8/5",
      color: "bg-purple-500",
      action: {
        label: "Ver perfil",
        onClick: () => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })
      }
    }
  ];

  return (
    <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-300" size={20} />
          <h3 className="font-semibold text-white">Análise da IA</h3>
        </div>
        <p className="text-white/60 text-sm mt-1">
          Insights e sugestões em tempo real
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {/* AI Suggestions */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <Lightbulb size={16} />
            Sugestões de Resposta
          </h4>
          <div className="space-y-3">
            {suggestions.slice(0, 2).map((suggestion, index) => (
              <SuggestionCard
                key={index}
                suggestion={suggestion}
                onAccept={() => handleAcceptSuggestion(suggestion)}
                onReject={handleRejectSuggestion}
              />
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Análise da Conversa
          </h4>
          <div className="space-y-3">
            {analysisData.map((item, index) => (
              <AnalysisCard
                key={index}
                icon={item.icon}
                title={item.title}
                content={item.content}
                color={item.color}
                action={item.action}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <Target size={16} />
            Ações Rápidas
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Escalar", color: "bg-red-500" },
              { label: "Transferir", color: "bg-blue-500" },
              { label: "Agendar", color: "bg-green-500" },
              { label: "Fechar", color: "bg-gray-500" }
            ].map((action, index) => (
              <Button
                key={index}
                size="sm"
                className={`${action.color} hover:opacity-80 text-white text-xs h-8`}
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium text-white mb-3">Métricas</h4>
          <div className="space-y-2">
            {[
              { label: "Precisão da IA", value: "94%", color: "text-green-400" },
              { label: "Tempo médio", value: "2m 34s", color: "text-blue-400" },
              { label: "Satisfação", value: "4.8/5", color: "text-yellow-400" }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white/70 text-sm">{metric.label}</span>
                <span className={`font-medium ${metric.color}`}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
