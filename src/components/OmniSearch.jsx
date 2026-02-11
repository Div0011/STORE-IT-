import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const OmniSearch = ({ value, onChange }) => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-burgundy dark:group-focus-within:text-brand-pastel transition-colors" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full pl-11 pr-32 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 dark:focus:ring-brand-pastel/20 focus:border-brand-burgundy dark:focus:border-brand-pastel transition-all shadow-sm"
                    placeholder="Search by name, tag, or content..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-pastel/30 dark:bg-brand-burgundy/40 rounded-lg text-xs font-medium text-brand-burgundy dark:text-brand-pastel">
                        <Sparkles size={14} className="animate-pulse" />
                        AI Search
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OmniSearch;
