import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreateBundleModal({ onClose }) {
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [bundleName, setBundleName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/themes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch themes');

      const result = await response.json();
      setThemes(result.data);
    } catch (err) {
      alert('Error loading themes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTheme) {
      alert('Please select a theme');
      return;
    }

    if (!bundleName.trim()) {
      alert('Please enter a bundle name');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');

      const response = await fetch('/api/user/bundles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: bundleName,
          theme_id: selectedTheme,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create bundle');
      }

      const result = await response.json();
      
      onClose();
      navigate(`/bundles/${result.data.id}/edit`);
    } catch (err) {
      alert('Error: ' + err.message);
      setSubmitting(false);
    }
  };

  // Get selected theme name
  const selectedThemeData = themes.find(t => t.id === selectedTheme);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Bundle</h2>
            <p className="text-sm text-gray-600">Choose a theme and give your bundle a name</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={submitting}
          >
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading themes...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Left Side - Form */}
              <div className="space-y-6">
                {/* Bundle Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bundle Name *
                  </label>
                  <input
                    type="text"
                    value={bundleName}
                    onChange={(e) => setBundleName(e.target.value)}
                    placeholder="e.g., My Social Links"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={submitting}
                  />
                </div>

                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Theme *
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => !submitting && setSelectedTheme(theme.id)}
                        className={`
                          border-2 rounded-lg p-3 cursor-pointer transition-all text-center
                          ${submitting ? 'opacity-50 cursor-not-allowed' : ''}
                          ${selectedTheme === theme.id
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow'
                          }
                        `}
                      >
                        <div className={`
                          w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center
                          ${selectedTheme === theme.id ? 'bg-blue-600' : 'bg-gray-200'}
                        `}>
                          <span className={`text-lg font-bold ${selectedTheme === theme.id ? 'text-white' : 'text-gray-600'}`}>
                            {theme.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="font-medium text-xs capitalize">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                  {!selectedTheme && (
                    <p className="text-red-500 text-sm mt-2">* Please select a theme</p>
                  )}
                </div>
              </div>

              {/* Right Side - Preview */}
              <div className="lg:border-l lg:pl-6">
                <div className="sticky top-6">
                  <h3 className="text-lg font-semibold mb-3">Preview</h3>
                  
                  {selectedTheme ? (
                    <div 
                      data-theme={selectedThemeData?.name || 'light'}
                      className="border-2 border-base-300 rounded-lg p-6 bg-base-100 min-h-[400px]"
                    >
                      <div className="text-center">
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-base-300 rounded-full mx-auto mb-3"></div>
                        
                        {/* Bundle Name */}
                        <h4 className="text-xl font-bold mb-3 text-base-content">
                          {bundleName || 'Your Bundle Name'}
                        </h4>
                        
                        {/* Sample Social Icons */}
                        <div className="flex gap-2 justify-center mb-4">
                          <div className="btn btn-circle btn-sm bg-pink-500 border-0"></div>
                          <div className="btn btn-circle btn-sm bg-gray-800 border-0"></div>
                          <div className="btn btn-circle btn-sm bg-blue-600 border-0"></div>
                        </div>

                        {/* Sample Links */}
                        <div className="space-y-2 max-w-xs mx-auto">
                          <div className="btn btn-primary btn-sm w-full">Sample Link 1</div>
                          <div className="btn btn-primary btn-sm w-full">Sample Link 2</div>
                          <div className="btn btn-primary btn-sm w-full">Sample Link 3</div>
                        </div>

                        {/* Theme Name Badge */}
                        <div className="mt-4">
                          <span className="badge badge-primary capitalize">
                            {selectedThemeData?.name} Theme
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[400px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <p className="text-sm">Select a theme to see preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !selectedTheme || !bundleName.trim()}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create & Continue'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateBundleModal;