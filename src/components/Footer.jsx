import React from 'react';
import { Shield, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-brand-burgundy text-white">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-slate-800 dark:text-white">
                                STORE IT!
                            </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                            AI-Powered Secure Document Storage with Advanced Encryption,
                            Intelligent Analysis, and Distributed Architecture.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                            <Shield size={12} />
                            <span>End-to-End Encrypted • Zero-Knowledge Architecture</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-white mb-4 uppercase tracking-wider">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/privacy-policy"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms-of-service"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-white mb-4 uppercase tracking-wider">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/Div0011/STORE-IT-"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors flex items-center gap-2"
                                >
                                    <Github size={14} />
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-burgundy dark:hover:text-brand-pastel transition-colors"
                                >
                                    API Reference
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                <span>© {currentYear} STORE IT!. All rights reserved.</span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1">
                                    Made with <Heart size={12} className="text-red-500 fill-red-500" /> by
                                    <strong className="text-brand-burgundy dark:text-brand-pastel ml-1">
                                        DIVYANSH AWASTHI
                                    </strong>
                                    <span className="text-xs">™</span>
                                </span>
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/Div0011"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-burgundy hover:text-white dark:hover:bg-brand-burgundy transition-all"
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/divyansh-awasthi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-burgundy hover:text-white dark:hover:bg-brand-burgundy transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="mailto:contact@divyanshawasthi.com"
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-burgundy hover:text-white dark:hover:bg-brand-burgundy transition-all"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack Badge */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
                            Built with React • FastAPI • Gemini AI • TailwindCSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
