
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConversationCard = ({ conversation, isSelected, onClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'WhatsApp': return '📱';
      case 'Telegram': return '✈️';
      case 'Instagram': return '📷';
      case 'Facebook': return '👥';
      default: return '💬';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-white/20 border-white/30 shadow-lg' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={conversation.avatar}
            alt={conversation.clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 text-lg">
            {getPlatformIcon(conversation.platform)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-white truncate">
              {conversation.clientName}
            </h4>
            <span className="text-white/60 text-xs">
              {formatTime(conversation.lastMessageTime)}
            </span>
          </div>
          
          <p className="text-white/70 text-sm truncate mb-2">
            {conversation.lastMessage}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(conversation.priority)}`}></div>
              <span className="text-white/50 text-xs capitalize">
                {conversation.priority}
              </span>
            </div>
            
            {conversation.unreadCount > 0 && (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || conv.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Conversas</h3>
          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
            <Plus size={16} className="mr-1" />
            Nova
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
        
        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'active', 'waiting', 'closed'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {filterOption === 'all' ? 'Todas' : 
               filterOption === 'active' ? 'Ativas' :
               filterOption === 'waiting' ? 'Aguardando' : 'Fechadas'}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {filteredConversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation?.id === conversation.id}
            onClick={() => onSelectConversation(conversation)}
          />
        ))}
        
        {filteredConversations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-white/60">Nenhuma conversa encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
