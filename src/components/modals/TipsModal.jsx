import React from 'react';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TipsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Tips & Tricks data
    const tipsCategories = [
        {
            id: 1,
            title: "Optimize Your Bundle",
            tips: [
                {
                    title: "Use a Clear Profile Picture",
                    description: "Choose a high-quality, recognizable photo that represents your brand or personality. This helps visitors instantly identify your Bundle."
                },
                {
                    title: "Write a Compelling Bio",
                    description: "Keep your bio concise and engaging. Highlight what you do and what visitors can expect from your links. Use keywords that describe your niche."
                },
                {
                    title: "Prioritize Important Links",
                    description: "Place your most important links at the top. Users typically click on the first 3-5 links, so make them count."
                },
                {
                    title: "Use Custom Link Titles",
                    description: "Instead of generic titles like 'Click Here', use descriptive titles like 'Download My Free Guide' or 'Shop My Latest Collection'."
                }
            ]
        },
        {
            id: 2,
            title: "Increase Engagement",
            tips: [
                {
                    title: "Update Links Regularly",
                    description: "Keep your Bundle fresh by updating links regularly. Remove outdated content and add new links to maintain visitor interest."
                },
                {
                    title: "Test Different Themes",
                    description: "Experiment with different themes to see which one resonates best with your audience. A visually appealing Bundle increases engagement."
                },
                {
                    title: "Add Social Media Links",
                    description: "Include links to all your active social media profiles. This helps visitors connect with you across multiple platforms."
                },
                {
                    title: "Create Urgency",
                    description: "Use time-sensitive offers or limited-time links to create urgency and encourage immediate clicks."
                }
            ]
        },
        {
            id: 3,
            title: "Analytics & Performance",
            tips: [
                {
                    title: "Monitor Your Analytics",
                    description: "Regularly check your Bundle analytics to understand which links perform best. Use this data to optimize your link placement."
                },
                {
                    title: "Track Click Patterns",
                    description: "Pay attention to when your links get the most clicks. Post on social media during these peak times for maximum impact."
                },
                {
                    title: "A/B Test Your Links",
                    description: "Try different link titles and placements to see what works best. Small changes can lead to significant improvements in click-through rates."
                }
            ]
        },
        {
            id: 4,
            title: "Best Practices",
            tips: [
                {
                    title: "Keep It Simple",
                    description: "Don't overwhelm visitors with too many links. Focus on quality over quantity - aim for 5-10 high-value links."
                },
                {
                    title: "Mobile-First Approach",
                    description: "Most users will view your Bundle on mobile devices. Ensure your content looks great on smaller screens."
                },
                {
                    title: "Use Consistent Branding",
                    description: "Maintain consistent colors, fonts, and imagery across your Bundle to strengthen your brand identity."
                },
                {
                    title: "Add a Call-to-Action",
                    description: "Guide visitors on what to do next. Use clear CTAs like 'Subscribe', 'Shop Now', or 'Get Started'."
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
                                <LightBulbIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Tips & Tricks</h2>
                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Maximize your Synapse usage with expert tips</p>
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
                                Learn how to get the most out of Synapse with these proven strategies and best practices. 
                                Apply these tips to increase engagement and grow your audience.
                            </p>
                        </div>

                        {/* Tips Categories */}
                        <div className="space-y-6 sm:space-y-8">
                            {tipsCategories.map((category, index) => (
                                <div key={category.id}>
                                    {/* Category Title */}
                                    <div className="mb-4 sm:mb-5">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </span>
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Tips List */}
                                    <div className="space-y-4 ml-0 sm:ml-10">
                                        {category.tips.map((tip, tipIndex) => (
                                            <div key={tipIndex} className="border-l-4 border-blue-500 pl-4 sm:pl-5">
                                                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                                                    {tip.title}
                                                </h4>
                                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                    {tip.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Divider (except for last item) */}
                                    {index !== tipsCategories.length - 1 && (
                                        <div className="mt-6 sm:mt-8 border-t border-gray-200"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pro Tip Section */}
                        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <LightBulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                                            Pro Tip
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                            The most successful Synapse users update their Bundle at least once a week and 
                                            check their analytics regularly. Consistency and data-driven decisions are key to growth!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Need More Help */}
                        <div className="mt-6 sm:mt-8">
                            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 sm:p-5">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                    Need More Help?
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                    Check out our complete documentation or contact support for personalized advice.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a 
                                        href="/docs"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        View Documentation
                                    </a>
                                    <a 
                                        href="mailto:synapsebioapp@gmail.com"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contact Support
                                    </a>
                                </div>
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

export default TipsModal;