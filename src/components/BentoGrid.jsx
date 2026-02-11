import React from 'react';
import { motion } from 'framer-motion';
import { Box, Activity, ShieldCheck, Database, Zap, Globe } from 'lucide-react';
import NodeMap from './NodeMap';

const BentoGrid = () => {
    const cards = [
        {
            title: "Storage Health",
            value: "99.9%",
            icon: <Activity className="text-emerald-400" />,
            colSpan: "col-span-2",
            rowSpan: "row-span-2",
            content: <NodeMap />
        },
        {
            title: "Encryption",
            value: "Quantum-Safe",
            icon: <ShieldCheck className="text-cobalt-400" />,
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
        },
        {
            title: "Active Blocks",
            value: "14,204",
            icon: <Database className="text-amber-400" />,
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
        },
        {
            title: "Global Sync",
            value: "Enabled",
            icon: <Globe className="text-indigo-400" />,
            colSpan: "col-span-1",
            rowSpan: "row-span-2",
        },
        {
            title: "Throughput",
            value: "1.2 GB/s",
            icon: <Zap className="text-yellow-400" />,
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
        },
    ];

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-6 w-full h-full max-h-[800px] mt-12">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass-card p-6 flex flex-col group relative overflow-hidden ${card.colSpan} ${card.rowSpan}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                            {card.icon}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live Feed</span>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-slate-400 text-xs mb-1 font-medium">{card.title}</h3>
                        <p className="text-2xl font-heading text-white">{card.value}</p>
                    </div>

                    {card.content && (
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            {card.content}
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-cobalt-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
};

export default BentoGrid;
