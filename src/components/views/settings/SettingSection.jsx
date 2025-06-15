import React from 'react';
import { motion } from 'framer-motion';

export const SettingSection = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon className="text-white" size={20} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);