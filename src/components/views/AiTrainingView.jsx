
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import { mockAiTrainingData } from '@/lib/mockData';
import { 
  Brain, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Target,
  MessageSquare,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const TrainingCard = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 card-hover"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{category.category}</h3>
        <p className="text-white/60 text-sm">{category.phrases.length} frases treinadas</p>
      </div>
      <div className="flex items-center gap-2">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          category.confidence >= 90 ? 'bg-green-500/20 text-green-300' :
          category.confidence >= 80 ? 'bg-yellow-500/20 text-yellow-300' :
          'bg-red-500/20 text-red-300'
        }`}>
          {category.confidence}% precisão
        </div>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      {category.phrases.slice(0, 2).map((phrase, idx) => (
        <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/80 text-sm">"{phrase}"</p>
        </div>
      ))}
      {category.phrases.length > 2 && (
        <p className="text-white/50 text-sm">+{category.phrases.length - 2} frases adicionais</p>
      )}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-white/50 text-xs">
        Último treinamento: {category.lastTrained.toLocaleDateString('pt-BR')}
      </span>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-white hover:bg-white/10"
          onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
        >
          <Edit size={14} />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-red-300 hover:bg-red-500/20"
          onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-white/70 text-sm">{title}</p>
      </div>
    </div>
    {subtitle && (
      <p className="text-white/50 text-xs">{subtitle}</p>
    )}
  </motion.div>
);

export default function AiTrainingView() {
  const [trainingData] = useState(mockAiTrainingData);

  return (
    <MainContent 
      title="Treinamento de IA" 
      subtitle="Gerencie e aprimore o conhecimento da inteligência artificial"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={Brain}
            title="Categorias Treinadas"
            value={trainingData.length}
            subtitle="Diferentes tipos de resposta"
            color="bg-purple-500"
          />
          <StatCard
            icon={MessageSquare}
            title="Total de Frases"
            value={trainingData.reduce((acc, cat) => acc + cat.phrases.length, 0)}
            subtitle="Frases de treinamento"
            color="bg-blue-500"
          />
          <StatCard
            icon={Target}
            title="Precisão Média"
            value={`${Math.round(trainingData.reduce((acc, cat) => acc + cat.confidence, 0) / trainingData.length)}%`}
            subtitle="Acurácia das respostas"
            color="bg-green-500"
          />
          <StatCard
            icon={Zap}
            title="Sugestões Aceitas"
            value="847"
            subtitle="Este mês"
            color="bg-orange-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Categorias de Treinamento</h2>
            <p className="text-white/60">Gerencie as categorias e frases para treinar a IA</p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Plus size={16} className="mr-2" />
              Nova Categoria
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <BookOpen size={16} className="mr-2" />
              Importar Dados
            </Button>
          </div>
        </div>

        {/* Training Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingData.map((category, index) => (
            <TrainingCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Performance Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Performance da IA</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
              <p className="text-white/70 text-sm">Precisão Geral</p>
              <p className="text-white/50 text-xs mt-1">+2% este mês</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1.2s</div>
              <p className="text-white/70 text-sm">Tempo de Resposta</p>
              <p className="text-white/50 text-xs mt-1">-0.3s este mês</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
              <p className="text-white/70 text-sm">Taxa de Aceitação</p>
              <p className="text-white/50 text-xs mt-1">+5% este mês</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Training Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {[
              { action: 'Nova categoria criada', detail: 'Problemas de Pagamento', time: '2h atrás', type: 'create' },
              { action: 'Frases atualizadas', detail: 'Saudações - 5 novas frases', time: '4h atrás', type: 'update' },
              { action: 'Treinamento executado', detail: 'Todas as categorias', time: '6h atrás', type: 'train' },
              { action: 'Categoria removida', detail: 'Teste - categoria temporária', time: '1d atrás', type: 'delete' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-400' :
                  activity.type === 'update' ? 'bg-blue-400' :
                  activity.type === 'train' ? 'bg-purple-400' : 'bg-red-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-white/60 text-xs">{activity.detail}</p>
                </div>
                <span className="text-white/50 text-xs">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainContent>
  );
}
