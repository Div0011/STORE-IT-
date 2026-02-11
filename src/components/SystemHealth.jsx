import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, AlertTriangle, Cpu, Database, Zap, RefreshCw } from 'lucide-react';

const SystemHealth = () => {
    const [nodes, setNodes] = useState([
        { id: 1, name: 'Node-Alpha', status: 'online', load: 12, health: 98 },
        { id: 2, name: 'Node-Beta', status: 'online', load: 45, health: 95 },
        { id: 3, name: 'Node-Gamma', status: 'online', load: 8, health: 99 },
        { id: 4, name: 'Node-Delta', status: 'online', load: 22, health: 92 },
        { id: 5, name: 'Node-Epsilon', status: 'online', load: 31, health: 96 },
    ]);

    const [chaosMode, setChaosMode] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        let interval;
        if (chaosMode) {
            interval = setInterval(() => {
                setNodes(current => {
                    const next = [...current];
                    const targetIdx = Math.floor(Math.random() * next.length);
                    if (next[targetIdx].status === 'online') {
                        next[targetIdx].status = 'failed';
                        setTimeout(() => {
                            setNodes(prev => prev.map(n => n.id === next[targetIdx].id ? { ...n, status: 'online' } : n));
                        }, 3000);
                    }
                    return next;
                });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [chaosMode]);

    const handleManualRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <div className="p-12 h-full flex flex-col bg-brand-burgundy text-white overflow-hidden transition-colors duration-700 relative">
            {/* Background Aesthetic Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pastel/5 rounded-full blur-[120px] pointer-events-none" />

            <header className="flex justify-between items-center mb-0 relative z-10">
                <div>
                    <h2 className="text-4xl font-heading font-bold mb-2">Cluster Topology</h2>
                    <p className="text-brand-pastel/60 text-sm font-mono uppercase tracking-[0.4em]">Integrated Distributed Layer</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleManualRefresh}
                        className={`p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw size={20} className="text-brand-pastel" />
                    </button>
                    <button
                        onClick={() => setChaosMode(!chaosMode)}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border ${chaosMode ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 border-white/10 text-brand-pastel hover:bg-white/10'}`}
                    >
                        {chaosMode ? 'CHAOS_PROTOCOL: ACTIVE' : 'ENABLE CHAOS'}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center relative">
                {/* Visualizing 5 DataNodes in a circle */}
                <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                    {nodes.map((node, i) => {
                        const angle = (i / nodes.length) * (Math.PI * 2) - (Math.PI / 2); // Start from top
                        const x = Math.cos(angle) * 220;
                        const y = Math.sin(angle) * 220;

                        return (
                            <motion.div
                                key={node.id}
                                initial={false}
                                animate={{
                                    x,
                                    y,
                                    scale: node.status === 'online' ? 1 : 0.9,
                                    opacity: node.status === 'online' ? 1 : 0.6
                                }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="absolute"
                            >
                                <div className={`w-36 h-36 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center justify-center relative group
                                    ${node.status === 'online' ? 'border-brand-pastel/30 bg-white/5 shadow-xl shadow-brand-pastel/5' : 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/10'}
                                `}>
                                    <div className={`absolute inset-0 rounded-[2.5rem] blur-2xl opacity-10 transition-all ${node.status === 'online' ? 'bg-brand-pastel' : 'bg-red-500'}`} />

                                    {node.status === 'online' ? (
                                        <Database className="text-brand-pastel mb-2 transition-transform group-hover:scale-110" size={32} />
                                    ) : (
                                        <AlertTriangle className="text-red-500 mb-2 animate-pulse" size={32} />
                                    )}
                                    <span className="text-[10px] font-mono font-bold tracking-widest opacity-40 uppercase">{node.name}</span>

                                    {node.status === 'online' && (
                                        <div className="mt-2 flex gap-1">
                                            {Array.from({ length: 3 }).map((_, shardIdx) => (
                                                <motion.div
                                                    key={shardIdx}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: shardIdx * 0.4 }}
                                                    className="w-2 h-2 rounded-full bg-brand-pastel/60"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Hover Stats */}
                                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 pointer-events-none translate-y-2 group-hover:translate-y-0">
                                        <div className="flex flex-col gap-2 min-w-[100px]">
                                            <div className="flex items-center justify-between gap-6">
                                                <span className="text-[9px] font-mono opacity-50 uppercase">Network Load</span>
                                                <span className="text-xs font-bold">{node.load}%</span>
                                            </div>
                                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                                <div className="bg-brand-pastel h-full transition-all" style={{ width: `${node.load}%` }} />
                                            </div>
                                            <div className="flex items-center justify-between gap-6 mt-1">
                                                <span className="text-[9px] font-mono opacity-50 uppercase">Health Index</span>
                                                <span className="text-xs font-bold text-emerald-400">{node.health}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Central Controller */}
                    <div className="absolute w-44 h-44 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center group shadow-2xl shadow-brand-pastel/5">
                        <div className="text-center z-10">
                            <div className="relative">
                                <Cpu className="mx-auto mb-3 text-brand-pastel group-hover:rotate-180 transition-transform duration-1000" size={48} />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -inset-4 border border-brand-pastel/20 border-dashed rounded-full"
                                />
                            </div>
                            <h4 className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase opacity-40">Controller_Alpha</h4>
                        </div>

                        {/* Shard Replication Pulse Rings */}
                        <div className="absolute inset-0 border border-brand-pastel/10 rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }} />
                        <div className="absolute inset-0 border border-brand-pastel/5 rounded-full animate-ping opacity-10" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    </div>
                </div>
            </div>

            <footer className="grid grid-cols-3 gap-8 mt-auto bg-white/5 border border-white/10 p-8 rounded-[3rem] relative z-10">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-brand-pastel/10 rounded-2xl"><Zap className="text-brand-pastel" size={28} /></div>
                    <div>
                        <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Global Latency</p>
                        <p className="text-3xl font-heading font-bold">14.2 ms</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 border-x border-white/5 px-10">
                    <div className="p-4 bg-brand-pastel/10 rounded-2xl"><Shield className="text-brand-pastel" size={28} /></div>
                    <div>
                        <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Redundancy Factor</p>
                        <p className="text-3xl font-heading font-bold">N = 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-brand-pastel/10 rounded-2xl"><Activity className="text-brand-pastel" size={28} /></div>
                    <div>
                        <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Security Protocol</p>
                        <p className="text-3xl font-heading font-bold">AEGIS-IV</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SystemHealth;
