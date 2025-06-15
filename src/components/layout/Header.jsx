
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ title, subtitle }) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-white/70 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings size={20} />
          </Button>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm">Online</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
