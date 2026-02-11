import React, { useMemo } from 'react';
import {
    FolderOpen,
    Clock,
    Star,
    Activity,
    MessageSquare,
    Zap,
    ShieldCheck,
    Lock,
    Settings
} from 'lucide-react';

const Logo = ({ currentMode }) => (
    <div className="flex items-center gap-4 mb-10 group cursor-pointer">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-lg transition-all group-hover:scale-110 relative overflow-hidden ${currentMode === 'pro' ? 'bg-brand-pastel text-brand-burgundy shadow-brand-pastel/20' : 'bg-brand-burgundy text-white shadow-brand-burgundy/20'
            }`}>
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
            </svg>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
            <span className="text-xl font-heading font-bold tracking-tight block dark:text-white">STORE IT!</span>
            <span className={`text-[8px] font-mono font-bold tracking-[0.4em] uppercase opacity-40 ${currentMode === 'pro' ? 'text-brand-pastel' : 'text-slate-500 dark:text-slate-400'}`}>
                Cognitive Core
            </span>
        </div>
    </div>
);

const Sidebar = ({ activeView, setActiveView, currentMode, setMode, files = [] }) => {
    const mainLinks = [
        { id: 'all', label: 'My Vault', icon: FolderOpen },
        { id: 'recent', label: 'Recent', icon: Clock },
        { id: 'starred', label: 'Starred', icon: Star },
        { id: 'safety', label: 'Privacy & Safety', icon: ShieldCheck },
        { id: 'chat', label: 'AI Vault Chat', icon: MessageSquare },
    ];

    const dynamicCategories = useMemo(() => {
        const tagMap = {};
        files.forEach(file => {
            if (file.tags && Array.isArray(file.tags)) {
                file.tags.forEach(tag => {
                    const normalized = tag.toLowerCase();
                    tagMap[normalized] = (tagMap[normalized] || 0) + 1;
                });
            }
            if (file.type) {
                const normalized = file.type.toLowerCase();
                tagMap[normalized] = (tagMap[normalized] || 0) + 1;
            }
        });

        return Object.entries(tagMap)
            .map(([label, count]) => ({
                id: label,
                label: label.charAt(0).toUpperCase() + label.slice(1),
                count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [files]);

    return (
        <aside className={`w-72 border-r flex flex-col h-full sticky top-0 transition-all duration-700 ${currentMode === 'pro'
            ? 'bg-brand-burgundy border-white/5 text-white'
            : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white'
            }`}>
            <div className="p-8 flex-1 flex flex-col">
                <Logo currentMode={currentMode} />

                <div className="space-y-1">
                    {mainLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setActiveView(link.id)}
                            className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${activeView === link.id
                                ? (currentMode === 'pro' ? 'bg-white/10 text-white shadow-inner' : 'bg-brand-pastel/40 dark:bg-brand-burgundy/30 text-brand-burgundy dark:text-brand-pastel font-semibold shadow-sm')
                                : (currentMode === 'pro' ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-200')
                                }`}
                        >
                            <link.icon size={20} />
                            <span className="text-sm">{link.label}</span>
                        </button>
                    ))}
                </div>

                {dynamicCategories.length > 0 && (
                    <div className="mt-12">
                        <h3 className={`px-5 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center justify-between ${currentMode === 'pro' ? 'text-white/30' : 'text-slate-300 dark:text-slate-600'
                            }`}>
                            <span>Dynamic Contexts</span>
                            <Zap size={10} />
                        </h3>
                        <nav className="space-y-2">
                            {dynamicCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveView(cat.id)}
                                    className={`w-full flex items-center justify-between px-5 py-2.5 group rounded-2xl transition-all ${activeView === cat.id
                                        ? (currentMode === 'pro' ? 'bg-white/10 text-white' : 'bg-brand-pastel/20 dark:bg-brand-burgundy/20 text-brand-burgundy dark:text-brand-pastel font-medium')
                                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeView === cat.id ? 'bg-brand-burgundy dark:bg-brand-pastel scale-125 shadow-[0_0_8px_rgba(100,48,61,0.5)]' : (currentMode === 'pro' ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-800')
                                            }`} />
                                        <span className={`text-sm transition-colors ${activeView === cat.id
                                            ? (currentMode === 'pro' ? 'text-white' : 'text-brand-burgundy dark:text-brand-pastel font-medium')
                                            : (currentMode === 'pro' ? 'text-white/50' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100')
                                            }`}>{cat.label}</span>
                                    </div>
                                    <span className={`text-[10px] font-mono tracking-tighter ${currentMode === 'pro' ? 'text-white/20' : 'text-slate-400 dark:text-slate-600'}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                <div className="mt-auto pt-10">
                    <button
                        onClick={() => setMode(currentMode === 'standard' ? 'pro' : 'standard')}
                        className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl border transition-all ${currentMode === 'pro'
                            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-inner'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-pastel hover:shadow-sm'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Activity size={18} className={currentMode === 'pro' ? 'text-brand-pastel animate-pulse' : 'text-slate-400 dark:text-slate-500'} />
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                {currentMode === 'pro' ? 'PRO_MODE: ACTIVE' : 'Switch to Pro'}
                            </span>
                        </div>
                        <div className={`w-8 h-4 rounded-full relative transition-all ${currentMode === 'pro' ? 'bg-brand-pastel' : 'bg-slate-200 dark:bg-slate-800'}`}>
                            <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all shadow-sm ${currentMode === 'pro' ? 'right-1' : 'left-1'}`} />
                        </div>
                    </button>

                    <div className="mt-4 px-6 opacity-20 text-[8px] font-mono uppercase tracking-widest text-center dark:text-slate-400">
                        Sync: Cognitive Cluster 01
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
