
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainContent from '@/components/layout/MainContent';
import ConversationList from '@/components/conversations/ConversationList';
import ChatArea from '@/components/chat/ChatArea';
import AiAnalysisPanel from '@/components/ai/AiAnalysisPanel';
import { mockConversations, mockMessages } from '@/lib/mockData';

export default function AtendimentoView() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [showAiPanel, setShowAiPanel] = useState(true);

  const conversationMessages = mockMessages.filter(
    msg => msg.conversationId === selectedConversation?.id
  );

  return (
    <MainContent 
      title="Atendimento" 
      subtitle="Gerencie conversas e atendimentos em tempo real"
    >
      <div className="h-full flex gap-6">
        {/* Conversations List */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 flex-shrink-0"
        >
          <ConversationList
            conversations={mockConversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex-1"
        >
          <ChatArea
            conversation={selectedConversation}
            messages={conversationMessages}
            onToggleAiPanel={() => setShowAiPanel(!showAiPanel)}
            showAiPanel={showAiPanel}
          />
        </motion.div>

        {/* AI Analysis Panel */}
        {showAiPanel && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="w-80 flex-shrink-0"
          >
            <AiAnalysisPanel
              conversation={selectedConversation}
              messages={conversationMessages}
            />
          </motion.div>
        )}
      </div>
    </MainContent>
  );
}
