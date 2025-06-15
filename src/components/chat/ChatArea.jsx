
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  Brain,
  Clock,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const MessageBubble = ({ message, isOwn, isAi }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isAi 
          ? 'ai-gradient text-white' 
          : isOwn 
            ? 'message-gradient text-white' 
            : 'bg-white/10 text-white border border-white/20'
      }`}>
        {isAi && (
          <div className="flex items-center gap-2 mb-1">
            <Brain size={14} />
            <span className="text-xs font-medium">Sugestão da IA</span>
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          {isOwn && (
            <CheckCircle2 size={12} className="text-green-300" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start mb-4"
  >
    <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg">
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  </motion.div>
);

export default function ChatArea({ 
  conversation, 
  messages, 
  onToggleAiPanel, 
  showAiPanel 
}) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Simulate sending message
    toast({
      title: "Mensagem enviada!",
      description: "Sua mensagem foi enviada com sucesso.",
    });
    
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-white" size={32} />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">
            Selecione uma conversa
          </h3>
          <p className="text-white/60">
            Escolha uma conversa da lista para começar o atendimento
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={conversation.avatar}
              alt={conversation.clientName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-white">{conversation.clientName}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/60 text-sm">Online</span>
                <span className="text-white/40 text-sm">• {conversation.platform}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Phone size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <Video size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`text-white hover:bg-white/10 ${showAiPanel ? 'bg-white/20' : ''}`}
              onClick={onToggleAiPanel}
            >
              <Brain size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
            >
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender === 'agent'}
              isAi={message.sender === 'ai'}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-end gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Paperclip size={18} />
          </Button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10"
            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })}
          >
            <Smile size={18} />
          </Button>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Send size={18} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-white/50">
          <span>Pressione Enter para enviar</span>
          <div className="flex items-center gap-4">
            <span>Tempo de resposta: 2m 34s</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Última atividade: agora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
