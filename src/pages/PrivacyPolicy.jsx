import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand-burgundy/10 dark:bg-brand-burgundy/20 mb-6">
                        <Shield size={32} className="text-brand-burgundy" />
                    </div>
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Last Updated: February 11, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-8">

                    {/* Introduction */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye size={24} className="text-brand-burgundy" />
                            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                                Introduction
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Welcome to STORE IT! We are committed to protecting your privacy and ensuring the security
                            of your personal information. This Privacy Policy explains how we collect, use, disclose,
                            and safeguard your information when you use our AI-powered secure document storage platform.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database size={24} className="text-brand-burgundy" />
                            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                                Information We Collect
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                    1. Files and Documents
                                </h3>
                                <p className="leading-relaxed">
                                    We collect and store the files you upload to our platform. These files are encrypted
                                    end-to-end and sharded across multiple secure nodes using our distributed architecture.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                    2. AI Analysis Data
                                </h3>
                                <p className="leading-relaxed">
                                    Our AI engine (powered by Google Gemini) analyzes your documents to provide intelligent
                                    features such as document classification, PII detection, and semantic search. This analysis
                                    is performed securely and the results are stored encrypted.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                    3. Usage Information
                                </h3>
                                <p className="leading-relaxed">
                                    We may collect information about how you interact with our platform, including upload
                                    frequency, file types, and feature usage to improve our services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck size={24} className="text-brand-burgundy" />
                            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                                How We Use Your Information
                            </h2>
                        </div>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">•</span>
                                <span>To provide secure storage and retrieval of your documents</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">•</span>
                                <span>To perform AI-powered analysis and provide intelligent insights</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">•</span>
                                <span>To detect and prevent security threats</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">•</span>
                                <span>To improve our services and develop new features</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">•</span>
                                <span>To comply with legal obligations</span>
                            </li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock size={24} className="text-brand-burgundy" />
                            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                                Data Security
                            </h2>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 space-y-3">
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <strong>Zero-Knowledge Architecture:</strong> We employ a zero-knowledge encryption model,
                                meaning we cannot access your unencrypted data.
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <strong>File Sharding:</strong> Your files are split into encrypted shards and distributed
                                across multiple secure nodes, ensuring no single point of failure.
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                <strong>End-to-End Encryption:</strong> All data is encrypted in transit and at rest using
                                industry-standard encryption protocols.
                            </p>
                        </div>
                    </section>

                    {/* Third-Party Services */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle size={24} className="text-brand-burgundy" />
                            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                                Third-Party Services
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            We use Google Gemini AI for document analysis. Your documents are processed securely, and
                            Google's privacy policy applies to this processing. We do not share your data with any other
                            third parties without your explicit consent.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-4">
                            Your Rights
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">✓</span>
                                <span>Access your personal data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">✓</span>
                                <span>Request deletion of your data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">✓</span>
                                <span>Export your data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-brand-burgundy mt-1">✓</span>
                                <span>Opt-out of AI analysis</span>
                            </li>
                        </ul>
                    </section>

                    {/* Contact */}
                    <section className="border-t border-slate-200 dark:border-slate-700 pt-8">
                        <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-4">
                            Contact Us
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            <a href="mailto:privacy@storeit.com" className="text-brand-burgundy hover:underline">
                                privacy@storeit.com
                            </a>
                        </p>
                    </section>
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-burgundy text-white rounded-2xl hover:opacity-90 transition-all font-semibold"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
