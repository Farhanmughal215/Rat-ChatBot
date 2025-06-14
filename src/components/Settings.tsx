import React from 'react';
import { Settings as SettingsIcon, User, Bell, Volume2, Loader2 } from 'lucide-react';

interface SettingsProps {
  username: string;
  onUsernameChange: (username: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ username, onUsernameChange }) => {
  const [notifications, setNotifications] = React.useState(true);
  const [gameRewards, setGameRewards] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(e.target.value);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="h-full overflow-y-auto smooth-scroll">
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-3 sm:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <SettingsIcon className="text-[#FACC15]" size={24} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FACC15]">SETTINGS</h1>
              <p className="text-gray-400 text-sm sm:text-base">Customize your $RAT experience 🐭⚙️</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-[#222] rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <User className="text-[#FACC15]" size={20} />
                  <h2 className="text-lg sm:text-xl font-bold text-[#FACC15]">Profile</h2>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div>
                  <label className="text-white font-medium block mb-2 text-sm sm:text-base">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] text-sm sm:text-base"
                    placeholder="Enter your username"
                  />
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">This is how other sewer citizens will see you</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-[#222] rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <Bell className="text-[#FACC15]" size={20} />
                  <h2 className="text-lg sm:text-xl font-bold text-[#FACC15]">Notifications</h2>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-medium text-sm sm:text-base">Push Notifications</label>
                    <p className="text-gray-400 text-xs sm:text-sm">Get notified about important updates</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? 'bg-[#FACC15]' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-medium text-sm sm:text-base">Game Rewards</label>
                    <p className="text-gray-400 text-xs sm:text-sm">Alert when you earn $RAT from games</p>
                  </div>
                  <button
                    onClick={() => setGameRewards(!gameRewards)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      gameRewards ? 'bg-[#FACC15]' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        gameRewards ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Audio */}
            <div className="bg-[#222] rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <Volume2 className="text-[#FACC15]" size={20} />
                  <h2 className="text-lg sm:text-xl font-bold text-[#FACC15]">Audio</h2>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white font-medium text-sm sm:text-base">Sound Effects</label>
                    <p className="text-gray-400 text-xs sm:text-sm">Play sounds for interactions and games</p>
                  </div>
                  <button
                    onClick={() => setSoundEffects(!soundEffects)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      soundEffects ? 'bg-[#FACC15]' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        soundEffects ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center space-y-4">
            <button 
              onClick={handleSaveChanges}
              disabled={isSaving}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base ${
                isSaving 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : saveSuccess
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-[#FACC15] hover:bg-[#FACC15]/80 hover:scale-105'
              } ${saveSuccess ? 'text-white' : 'text-[#222]'}`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                  <span>Changes Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>

            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2 fade-in">
                <p className="text-green-400 text-xs sm:text-sm font-medium">
                  ✅ Your settings have been saved successfully!
                </p>
              </div>
            )}
          </div>

          {/* Bottom Message */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#1E3A8A] to-[#005EB8] rounded-xl p-4 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#FACC15] mb-2">🐭 STAY BASED, RAT! 🐭</h3>
            <p className="text-white text-sm sm:text-base">Your settings are automatically saved and synced across all devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;