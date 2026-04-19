import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import Sidebar from './components/Sidebar';
import OmniSearch from './components/OmniSearch';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    MoreVertical,
    LayoutGrid,
    List,
    AlertTriangle,
    Shield,
    Search,
    Plus,
    Upload,
    Moon,
    Sun,
    Maximize2,
    Lock,
    Eye,
    ShieldAlert,
    Terminal
} from 'lucide-react';

const FileInsights = lazy(() => import('./components/FileInsights'));
const SystemHealth = lazy(() => import('./components/SystemHealth'));
const FileShredder = lazy(() => import('./components/FileShredder'));
const VaultChat = lazy(() => import('./components/VaultChat'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const ToastContainer = lazy(() => import('./components/ToastContainer'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
    const [activeView, setActiveView] = useState('all');
    const [isInsightsOpen, setIsInsightsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentMode, setMode] = useState('standard');
    const [darkMode, setDarkMode] = useState(false);
    const [safetyScan, setSafetyScan] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isExternalUploadInProgress, setIsExternalUploadInProgress] = useState(false);
    const [toasts, setToasts] = useState([]);

    const fileInputRef = useRef(null);

    const fetchFiles = async () => {
        try {
            const response = await fetch('http://localhost:8000/files');
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
            }
        } catch (error) {
            console.error('[App] Failed to fetch vault files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const addToast = (message, type = 'info', aiData = null) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, aiData }]);
        setTimeout(() => removeToast(id), 8000); // Auto-dismiss after 8 seconds
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const handleGenesisUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsExternalUploadInProgress(true);
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                await fetchFiles();

                // Show AI analysis in toast
                addToast(
                    `File analyzed successfully!`,
                    'ai',
                    result.intelligence
                );
            }
        } catch (err) {
            console.error("Upload failed", err);
            addToast('Upload failed. Please try again.', 'warning');
        } finally {
            setIsExternalUploadInProgress(false);
        }
    };

    // Normalize files to ensure all have required fields
    const normalizeFile = (file) => ({
        ...file,
        name: file.name || file.filename || 'Unnamed File',
        filename: file.filename || file.name || 'Unnamed File',
        tags: Array.isArray(file.tags) ? file.tags : [],
        category: file.category || file.type || 'Other',
        type: file.type || 'Document',
        size: file.size || 'Unknown',
        updated: file.updated || 'N/A',
        pii_types: Array.isArray(file.pii_types) ? file.pii_types : [],
    });

    const filteredFiles = (files.map(normalizeFile)).filter(f => {
        const matchesView = activeView === 'all'
            || f.type.toLowerCase() === activeView
            || (Array.isArray(f.tags) && f.tags.some(t => t.toLowerCase() === activeView));

        const matchesSearch = searchQuery === ''
            || (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase()))
            || (Array.isArray(f.tags) && f.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesView && matchesSearch;
    });

    const PrivacySafetyView = () => (
        <div className="max-w-4xl mx-auto py-12 space-y-12">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-pastel/20 flex items-center justify-center text-brand-burgundy dark:text-brand-pastel">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-slate-800 dark:text-white">Vault Encryption</h2>
                        <p className="text-sm text-slate-400 dark:text-slate-500 uppercase font-mono tracking-widest mt-1">AES-256-GCM Protocol</p>
                    </div>
                </div>
                <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>Every file uploaded to STORE IT! is automatically shredded into fragmented blocks before being distributed across your local cluster nodes. No single node contains the complete data, preventing unauthorized retrieval even if a node is compromised.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <Eye size={20} className="text-brand-burgundy dark:text-brand-pastel mb-3" />
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">Zero-Knowledge</h4>
                            <p className="text-xs">The system metadata is hashed and stored separately from the content shards.</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <ShieldAlert size={20} className="text-brand-burgundy dark:text-brand-pastel mb-3" />
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">Auto-Shredding</h4>
                            <p className="text-xs">Proprietary "Cognitive Shred" technology isolates sensitive patterns using local LLMs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-brand-burgundy p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pastel/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl font-heading font-bold mb-4">Safety Scan Intelligence</h3>
                        <p className="text-white/70 mb-8 max-w-lg">Enable Safety Scan to visualize potential security risks and sensitive data clusters in your vault. Our local AI identifies PII and high-risk documents automatically.</p>
                        <button
                            onClick={() => setSafetyScan(!safetyScan)}
                            className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${safetyScan ? 'bg-white text-brand-burgundy' : 'bg-brand-pastel text-brand-burgundy'}`}
                        >
                            <Shield size={20} />
                            {safetyScan ? 'DISABLE_PROTECTION' : 'ACTIVATE_SAFETY_SCAN'}
                        </button>
                    </div>
                    <div className="hidden lg:block w-48 h-48 bg-white/5 rounded-[2.5rem] p-6 border border-white/10 backdrop-blur-md">
                        <Terminal size={32} className="text-brand-pastel mb-4" />
                        <div className="space-y-2 opacity-30">
                            <div className="h-1 w-full bg-white rounded" />
                            <div className="h-1 w-3/4 bg-white rounded" />
                            <div className="h-1 w-full bg-white rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`flex min-h-screen transition-all duration-700 font-body overflow-x-hidden ${darkMode ? 'dark bg-slate-950 text-slate-100' :
            (currentMode === 'pro' ? 'bg-brand-burgundy selection:bg-brand-pastel/30' : 'bg-brand-bg selection:bg-brand-pastel selection:text-brand-burgundy')
            }`}>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-100 dark:border-slate-800"
            >
                <List size={20} />
            </button>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar
                    activeView={activeView}
                    setActiveView={(view) => {
                        setActiveView(view);
                        setIsSidebarOpen(false);
                        if (currentMode === 'pro') setMode('standard');
                    }}
                    currentMode={currentMode}
                    setMode={setMode}
                    files={files}
                />
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-45 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
                <AnimatePresence mode="wait">
                    {currentMode === 'pro' ? (
                        <motion.div
                            key="pro-view"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex-1 h-full"
                        >
                            <Suspense fallback={<div className="h-full flex items-center justify-center text-white/20">Initialising Cluster Node Topology...</div>}>
                                <SystemHealth />
                            </Suspense>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="standard-view"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex-1 flex flex-col h-full overflow-hidden"
                        >
                            {/* Header Area */}
                            <header className={`px-4 lg:px-8 py-4 lg:py-6 flex flex-col lg:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md z-10 gap-4 transition-colors duration-500`}>
                                <div className="w-full lg:flex-1 lg:pl-0">
                                    <OmniSearch value={searchQuery} onChange={setSearchQuery} />
                                </div>
                                <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-6 lg:ml-12">
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                                        <button
                                            onClick={() => setDarkMode(false)}
                                            className={`p-2 rounded-xl transition-all ${!darkMode ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-burgundy' : 'text-slate-400'}`}
                                        >
                                            <Sun size={16} />
                                        </button>
                                        <button
                                            onClick={() => setDarkMode(true)}
                                            className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-600 shadow-sm text-brand-pastel' : 'text-slate-400'}`}
                                        >
                                            <Moon size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setSafetyScan(!safetyScan)}
                                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-2xl border transition-all text-xs font-bold ${safetyScan
                                            ? 'bg-brand-burgundy text-white border-brand-burgundy shadow-lg shadow-brand-burgundy/20'
                                            : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-brand-burgundy/30'
                                            }`}
                                    >
                                        <Shield size={14} className={safetyScan ? 'animate-pulse' : ''} />
                                        <span className="hidden sm:inline">SAFETY SCAN:</span> {safetyScan ? 'ON' : 'OFF'}
                                    </button>

                                    <button
                                        onClick={() => setIsProfileOpen(true)}
                                        className="w-10 h-10 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm shrink-0 hover:scale-110 active:scale-95 transition-all"
                                    >
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                                    </button>
                                </div>
                            </header>

                            {/* Sub-Header / Controls */}
                            <div className="px-4 lg:px-8 py-4 flex items-center justify-between bg-white/30 dark:bg-slate-900/10">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg lg:text-xl font-heading font-bold text-slate-800 dark:text-slate-100 capitalize truncate max-w-[150px] sm:max-w-none">{activeView.replace('-', ' ')}</h2>
                                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{activeView === 'safety' ? 'Protection Active' : `${filteredFiles.length} Records`}</span>
                                </div>

                                {activeView !== 'safety' && (
                                    <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-lg border border-slate-200/50 dark:border-slate-700">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-burgundy dark:text-brand-pastel' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            <LayoutGrid size={18} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-burgundy dark:text-brand-pastel' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            <List size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-12 scrollbar-none">
                                {activeView === 'safety' ? (
                                    <PrivacySafetyView />
                                ) : filteredFiles.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center mt-12 mb-20">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full max-w-sm p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none items-center flex flex-col"
                                        >
                                            <div className="w-24 h-24 rounded-[2rem] bg-brand-pastel/20 flex items-center justify-center mb-8 relative">
                                                <div className="absolute inset-0 bg-brand-pastel/10 animate-ping rounded-[2rem]" />
                                                <Upload size={40} className="text-brand-burgundy dark:text-brand-pastel" />
                                            </div>
                                            <h3 className="text-2xl font-heading font-bold text-slate-800 dark:text-white mb-3">Initialize Your Vault</h3>
                                            <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 max-w-[200px]">Select a file to start the genesis replication process.</p>

                                            <button
                                                onClick={handleGenesisUpload}
                                                disabled={isExternalUploadInProgress}
                                                className={`px-8 py-4 bg-brand-burgundy text-white rounded-2xl font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-burgundy/20 ${isExternalUploadInProgress ? 'opacity-50' : ''}`}
                                            >
                                                {isExternalUploadInProgress ? <Terminal className="animate-spin" /> : <Plus size={20} />}
                                                {isExternalUploadInProgress ? 'PROCESSING...' : 'UPLOAD_GENESIS'}
                                            </button>
                                        </motion.div>
                                    </div>
                                ) : (
                                    <div className={viewMode === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-4 pb-24"
                                        : "flex flex-col gap-2 mt-4 pb-24"}>

                                        {filteredFiles.map((file, i) => (
                                            <motion.div
                                                key={file.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => {
                                                    setSelectedFile(file);
                                                    setIsInsightsOpen(true);
                                                }}
                                                className={viewMode === 'grid'
                                                    ? `bg-white dark:bg-slate-900 p-6 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden ${safetyScan && file.sensitive
                                                        ? 'border-brand-burgundy/40 shadow-xl shadow-brand-burgundy/5'
                                                        : 'border-slate-50 dark:border-slate-800 hover:border-brand-pastel/50 shadow-sm'
                                                    }`
                                                    : "bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 flex items-center justify-between hover:border-brand-pastel/50 transition-all cursor-pointer group shadow-sm"}
                                            >
                                                {safetyScan && file.sensitive && (
                                                    <div className="absolute top-4 right-4 text-brand-burgundy dark:text-brand-pastel animate-pulse">
                                                        <AlertTriangle size={16} />
                                                    </div>
                                                )}

                                                <div className={viewMode === 'grid' ? "" : "flex items-center gap-4 flex-1"}>
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 shadow-sm ${file.type === 'Certificate' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500' :
                                                        file.type === 'Poem' ? 'bg-brand-pastel/30 dark:bg-brand-pastel/10 text-brand-burgundy dark:text-brand-pastel' :
                                                            'bg-blue-50 dark:bg-blue-950/30 text-blue-500'
                                                        } ${viewMode === 'grid' ? '' : 'mb-0 w-10 h-10'}`}>
                                                        <FileText size={viewMode === 'grid' ? 28 : 20} />
                                                    </div>

                                                    <div className="flex-1 overflow-hidden">
                                                        <h3 className="font-heading font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors">{file.name}</h3>
                                                        <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                                            <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">
                                                                {file.type}
                                                            </span>
                                                            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{file.size}</span>
                                                        </div>
                                                        {file.pii_types && file.pii_types.length > 0 && (
                                                            <div className="flex items-center gap-1.5 mt-2">
                                                                <Shield size={10} className="text-amber-500" />
                                                                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-amber-500">
                                                                    {file.pii_types.length} PII Detected
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {viewMode === 'grid' && (
                                                    <div className="mt-6 pt-5 border-t border-slate-50 dark:border-slate-800 flex flex-wrap gap-1.5">
                                                        {file.tags.map(tag => (
                                                            <span key={tag} className="text-[9px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-tighter bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-brand-pastel/30 group-hover:text-brand-burgundy dark:group-hover:text-brand-pastel transition-colors">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {viewMode === 'list' && (
                                                    <div className="flex items-center gap-8 ml-8">
                                                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 w-24 uppercase">{file.updated}</span>
                                                        <div className="flex gap-1">
                                                            {file.tags.slice(0, 2).map(tag => (
                                                                <span key={tag} className="text-[9px] px-2.5 py-1 rounded-lg bg-brand-pastel/20 text-brand-burgundy dark:text-brand-pastel font-bold uppercase tracking-tighter">#{tag}</span>
                                                            ))}
                                                        </div>
                                                        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-300 dark:text-slate-600 transition-colors">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                                {safetyScan && file.sensitive && (
                                                    <div className="absolute inset-0 bg-brand-burgundy/5 pointer-events-none" />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Floating Upload Button - Only visible when not empty */}
                            {files.length > 0 && (
                                <motion.button
                                    onClick={handleGenesisUpload}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="fixed bottom-8 right-8 w-16 h-16 bg-brand-burgundy text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-burgundy/40 z-30 hover:scale-110 active:scale-95 transition-all group"
                                >
                                    <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Suspense fallback={null}>
                    <FileShredder onShredComplete={fetchFiles} />
                    <VaultChat
                        isOpen={activeView === 'chat' || isChatOpen}
                        onClose={() => {
                            setIsChatOpen(false);
                            if (activeView === 'chat') setActiveView('all');
                        }}
                    />
                    <FileInsights
                        isOpen={isInsightsOpen}
                        onClose={() => {
                            setIsInsightsOpen(false);
                            setSelectedFile(null);
                        }}
                        fileData={selectedFile}
                        onShowToast={addToast}
                        onRefresh={fetchFiles}
                    />
                    <UserProfile
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                    />
                    <ToastContainer
                        toasts={toasts}
                        removeToast={removeToast}
                    />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default App;
