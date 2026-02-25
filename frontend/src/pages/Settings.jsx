import React, { useState } from 'react';
import { Shield, Bell, Eye, Globe, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, anonymousMode, toggleAnonymousMode } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareLearningProgress: true
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your privacy preferences and notification settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-500" />
              <span>Privacy & Security</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Anonymous Mode</h4>
                  <p className="text-sm text-gray-600">Browse and chat anonymously</p>
                </div>
                <button
                  onClick={toggleAnonymousMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    anonymousMode ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      anonymousMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                  <p className="text-sm text-gray-600">Who can see your profile</p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none"
                >
                  <option value="public">Everyone</option>
                  <option value="members">Members only</option>
                  <option value="connections">Connections only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Show Online Status</h4>
                  <p className="text-sm text-gray-600">Let others see when you're online</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showOnlineStatus ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary-500" />
              <span>Notifications</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Allow Direct Messages</h4>
                  <p className="text-sm text-gray-600">Let others send you direct messages</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, allowDirectMessages: !prev.allowDirectMessages }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowDirectMessages ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.allowDirectMessages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary-500" />
              <span>Display & Sharing</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Share Learning Progress</h4>
                  <p className="text-sm text-gray-600">Show your progress on public leaderboards</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, shareLearningProgress: !prev.shareLearningProgress }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.shareLearningProgress ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.shareLearningProgress ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
