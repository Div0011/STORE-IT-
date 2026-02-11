import React from 'react';
import { Search, HardDrive, Share2, Shield, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const CommandDock = () => {
    const actions = [
        { icon: <Search size={20} />, label: 'Search' },
        { icon: <HardDrive size={20} />, label: 'Storage' },
        { icon: <Share2 size={20} />, label: 'Deploy' },
        { icon: <Activity size={20} />, label: 'Pulse' },
        { icon: <Shield size={20} />, label: 'Security' },
        { icon: <Settings size={20} />, label: 'Config' },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pt-2"
        >
            <div className="glass-card flex items-center gap-2 p-2 px-4 shadow-[0_0_30px_rgba(56,189,248,0.1)] border-white/5">
                {actions.map((action, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl hover:bg-cobalt-400/10 text-slate-400 hover:text-cobalt-400 transition-colors group relative"
                    >
                        {action.icon}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cobalt-950/80 backdrop-blur px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap">
                            {action.label}
                        </span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default CommandDock;
