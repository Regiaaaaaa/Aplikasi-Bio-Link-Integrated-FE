import React from 'react';
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SecurityModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden animate-slideUp">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShieldCheckIcon className="w-8 h-8 text-white" />
                            <h2 className="text-2xl font-bold text-white">Keamanan & Privasi</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar">
                        {/* Introduction */}
                        <div className="mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                Di Synapse, kami sangat serius dalam melindungi privasi dan keamanan data Anda. 
                                Berikut adalah komitmen kami untuk menjaga informasi Anda tetap aman.
                            </p>
                        </div>

                        {/* Policy Sections */}
                        <div className="space-y-6">
                            {/* Section 1 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    1. Pengumpulan Data
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami hanya mengumpulkan data yang diperlukan untuk memberikan layanan terbaik kepada Anda. 
                                    Data yang dikumpulkan meliputi informasi profil (nama, email, username), data Bundle yang Anda buat, 
                                    dan analytics untuk membantu Anda memahami performa konten Anda.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    2. Penggunaan Data
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Data Anda digunakan untuk:
                                </p>
                                <ul className="mt-2 space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>Menyediakan dan meningkatkan layanan Synapse</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>Memberikan analytics dan insight tentang performa Bundle Anda</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>Mengirimkan update dan notifikasi penting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>Mencegah penyalahgunaan dan aktivitas fraud</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    3. Keamanan Data
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami menggunakan enkripsi tingkat industri (SSL/TLS) untuk melindungi data Anda saat transit. 
                                    Password Anda di-hash menggunakan algoritma bcrypt yang aman. Server kami dilindungi dengan 
                                    firewall dan sistem keamanan berlapis untuk mencegah akses tidak sah.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    4. Berbagi Data dengan Pihak Ketiga
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami <strong>tidak akan pernah</strong> menjual data pribadi Anda kepada pihak ketiga. 
                                    Data Anda hanya dibagikan dengan service provider tepercaya yang membantu kami mengoperasikan 
                                    platform (seperti hosting, email service), dan mereka terikat kontrak untuk menjaga kerahasiaan data Anda.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    5. Hak Pengguna
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-2">
                                    Anda memiliki hak penuh atas data Anda:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span><strong>Akses:</strong> Anda dapat mengakses semua data pribadi Anda kapan saja</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span><strong>Edit:</strong> Anda dapat mengubah informasi profil Anda sewaktu-waktu</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span><strong>Hapus:</strong> Anda dapat menghapus akun dan semua data Anda secara permanen</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span><strong>Export:</strong> Anda dapat mengekspor semua data Anda dalam format yang dapat dibaca</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 6 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    6. Cookies dan Tracking
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami menggunakan cookies untuk menjaga sesi login Anda dan memberikan pengalaman yang dipersonalisasi. 
                                    Anda dapat mengatur preferensi cookies di browser Anda. Kami juga menggunakan analytics untuk 
                                    memahami bagaimana pengguna berinteraksi dengan platform kami, tetapi data ini diagregasi dan tidak 
                                    mengidentifikasi individu tertentu.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    7. Perubahan Kebijakan
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Jika ada perubahan signifikan, 
                                    kami akan memberi tahu Anda melalui email atau notifikasi di platform. Kami mendorong Anda untuk 
                                    meninjau kebijakan ini secara berkala.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    8. Hubungi Kami
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Jika Anda memiliki pertanyaan tentang kebijakan privasi kami atau ingin menggunakan hak Anda 
                                    terkait data pribadi, silakan hubungi kami di:
                                </p>
                                <div className="mt-3 bg-purple-50 p-4 rounded-lg">
                                    <p className="text-gray-700">
                                        <strong>Email:</strong> synapse@gmail.com<br />
                                        <strong>Alamat:</strong> Jakarta, Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Last Updated */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                Terakhir diperbarui: 15 Desember 2024
                            </p>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <button 
                            onClick={onClose}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                        >
                            Saya Mengerti
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #a855f7;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9333ea;
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

export default SecurityModal;