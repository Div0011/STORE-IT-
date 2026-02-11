import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Sparkles, CheckCircle2, Shield, Database } from 'lucide-react';

const FileShredder = ({ onShredComplete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [shardingStage, setShardingStage] = useState(0); // 0: Idle, 1: Scanning, 2: Sharding, 3: Replicating

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;

        setIsDragging(false);
        setIsAnalyzing(true);
        setShardingStage(1);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // 1. Initiate Scanning & Upload
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Gateway Connection Failed');

            const result = await response.json();

            // 2. Simulate the visual "Sharding" stage if successful
            setShardingStage(2);
            await new Promise(r => setTimeout(r, 1200));

            // 3. Replicating Stage
            setShardingStage(3);
            await new Promise(r => setTimeout(r, 1500));

            // Success Finish
            console.log('[FileShredder] Upload & Shard Success:', result);
            setIsAnalyzing(false);
            setShardingStage(0);
            if (onShredComplete) onShredComplete(result);

        } catch (error) {
            console.error('[FileShredder] Error:', error);
            setIsAnalyzing(false);
            setShardingStage(0);
            alert("UPLOAD_FAILED: Check if Gateway API is running at localhost:8000");
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[60] transition-all duration-500 pointer-events-none flex items-center justify-center
                    ${isDragging ? 'bg-brand-burgundy/10 backdrop-blur-md' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ pointerEvents: isDragging || isAnalyzing ? 'auto' : 'none' }}
            >
                <AnimatePresence>
                    {isDragging && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-pastel flex flex-col items-center gap-6"
                        >
                            <div className="w-24 h-24 rounded-[2rem] bg-brand-pastel/30 flex items-center justify-center text-brand-burgundy animate-bounce">
                                <FileUp size={40} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-heading font-bold text-slate-800 tracking-tight">COGNITIVE_UPLOAD</h3>
                                <p className="text-slate-400 text-sm mt-2 font-body max-w-xs">Drop blocks to initiate semantic sharding across the cluster nodes.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[100] flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center gap-12 max-w-2xl text-center">

                                <div className="relative h-64 w-64 flex items-center justify-center">
                                    {/* Central Analysis Pulse */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-brand-burgundy rounded-full"
                                    />

                                    {shardingStage === 1 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-brand-burgundy z-10"
                                        >
                                            <Sparkles size={64} className="animate-spin-slow" />
                                        </motion.div>
                                    )}

                                    {shardingStage >= 2 && (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            {/* The Shards (N=3) */}
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: 0, y: 0, scale: 0 }}
                                                    animate={{
                                                        x: shardingStage === 3 ? (Math.cos((i / 3) * Math.PI * 2) * 120) : 0,
                                                        y: shardingStage === 3 ? (Math.sin((i / 3) * Math.PI * 2) * 120) : 0,
                                                        scale: 1,
                                                        rotate: shardingStage === 3 ? 360 : 0
                                                    }}
                                                    transition={{ type: 'spring', damping: 15 }}
                                                    className="absolute w-12 h-12 bg-brand-pastel rounded-xl shadow-lg flex items-center justify-center text-brand-burgundy border border-white"
                                                >
                                                    <Database size={20} />
                                                </motion.div>
                                            ))}
                                            {shardingStage === 2 && (
                                                <motion.div className="z-10 text-slate-800 font-mono font-bold">SHARDING_INVOKED</motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <h3 className="text-2xl font-heading font-bold text-slate-800 tracking-tighter uppercase">
                                            {shardingStage === 1 ? 'Semantic Scanning' : shardingStage === 2 ? 'Exploding into Shards' : 'Distributing Replicas (N=3)'}
                                        </h3>
                                        <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(shardingStage / 3) * 100}%` }}
                                                className="h-full bg-brand-burgundy"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-center">
                                        {[
                                            { icon: Sparkles, label: 'ML_TAGGING', active: shardingStage >= 1 },
                                            { icon: Database, label: 'SHARD_GEN', active: shardingStage >= 2 },
                                            { icon: Shield, label: 'NODE_REPLICATION', active: shardingStage >= 3 }
                                        ].map((step, idx) => (
                                            <div key={idx} className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${step.active ? 'bg-brand-burgundy/5 border-brand-burgundy text-brand-burgundy' : 'bg-slate-50 border-slate-100 text-slate-300'
                                                }`}>
                                                <step.icon size={14} />
                                                <span className="text-[10px] font-mono font-bold">{step.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default FileShredder;
