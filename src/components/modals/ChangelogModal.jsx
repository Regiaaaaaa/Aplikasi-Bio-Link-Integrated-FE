import React from 'react';
import { DocumentTextIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ChangelogModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Changelog data 
    const updates = [
        {
            version: "1.2.0",
            date: "January 10, 2025",
            type: "minor",
            title: "Update & Bug Fixes",
            changes: [
                {
                    category: "New Features",
                    items: [
                        "Added appeal feature for banned users - users can now submit an appeal if their account gets banned",
                    ]
                },
                {
                    category: "Bug Fixes",
                    items: [
                        "Fixed Google login blank error - resolved authentication issue that caused blank screen during Google sign-in",
                    ]
                }
            ]
        },
        {
            version: "1.1.0",
            date: "December 2024",
            type: "minor",
            title: "Initial Features",
            changes: [
                {
                    category: "Core Features",
                    items: [
                        "Complete user authentication system",
                        "Bundle creation and management",
                        "Multiple theme options",
                        "Analytics dashboard",
                        "Social media link integration",
                    ]
                }
            ]
        }
    ];

    return (
        <>
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-slideUp border border-gray-200">
                    {/* Modal Header */}
                    <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-200 flex items-start justify-between sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-3 flex-1 pr-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                                <DocumentTextIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Changelog</h2>
                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Latest updates and new features</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-900 rounded-lg p-2 hover:bg-gray-100 transition-colors flex-shrink-0"
                            aria-label="Close"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-180px)] custom-scrollbar">
                        {/* Introduction */}
                        <div className="mb-6 sm:mb-8">
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                We're constantly improving Synapse to give you the best experience. 
                                Check out our latest updates, new features, and bug fixes below.
                            </p>
                        </div>

                        {/* Updates Timeline */}
                        <div className="space-y-6 sm:space-y-8">
                            {updates.map((update, index) => (
                                <div key={index} className="relative">
                                    {/* Timeline Line */}
                                    {index !== updates.length - 1 && (
                                        <div className="absolute left-[19px] top-[60px] bottom-[-32px] w-0.5 bg-gray-200" />
                                    )}
                                    
                                    {/* Update Card */}
                                    <div className="relative">
                                        {/* Version Badge */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10">
                                                <span className="text-white font-bold text-sm">
                                                    {update.version.split('.')[1]}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        update.type === 'major' 
                                                            ? 'bg-purple-100 text-purple-700' 
                                                            : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        {update.version}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-gray-500">
                                                        {update.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                                                    {update.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Changes Content */}
                                        <div className="ml-[52px] space-y-5">
                                            {update.changes.map((change, changeIndex) => (
                                                <div key={changeIndex} className="border-l-4 border-blue-500 pl-4">
                                                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                                                        {change.category}
                                                    </h4>
                                                    <ul className="space-y-2.5">
                                                        {change.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600">
                                                                <span className="text-blue-600 mt-1.5 flex-shrink-0">•</span>
                                                                <span className="leading-relaxed">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stay Updated Section */}
                        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 sm:p-6 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                    Stay Updated
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    Want to be the first to know about new features? Follow us on social media 
                                    or enable notifications in your settings.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                        Push Notifications
                                    </span>
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                        Email Updates
                                    </span>
                                    <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                        Social Media
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="mt-6 sm:mt-8">
                            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 sm:p-5">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                    Have suggestions?
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                    We'd love to hear your feedback! Help us make Synapse better by sharing your ideas.
                                </p>
                                <a 
                                    href="mailto:synapsebioapp@gmail.com?subject=Feature Request"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Send Feedback
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="bg-gray-50 px-5 sm:px-8 py-4 sm:py-5 border-t border-gray-200 sticky bottom-0">
                        <button 
                            onClick={onClose}
                            className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md shadow-blue-500/20"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar & Animation Styles */}
            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db transparent;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #d1d5db;
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default ChangelogModal;