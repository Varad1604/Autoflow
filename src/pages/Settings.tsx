import { AppLayout } from '../components/layout/AppLayout';
import { useState, useEffect } from 'react';
import { Switch } from '../components/ui/switch';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') !== 'false');
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || '');

  useEffect(() => {
    const storedKey = localStorage.getItem('geminiApiKey') || '';
    setApiKey(storedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('geminiApiKey', apiKey);
    localStorage.setItem('language', language);
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('profileName', profileName);
    alert('Settings saved!');
  };

  // Real-time dark mode toggle
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppLayout>
      <div className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground mb-8">Configure your preferences and account settings.</p>
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-6">
          {/* Profile Name */}
          <div>
            <label className="text-lg font-semibold mb-2">Profile Name</label>
            <input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              placeholder="Enter your name"
              className="border rounded p-2 w-full mb-2"
            />
          </div>

          {/* Gemini API Key */}
          <div>
            <label className="text-lg font-semibold mb-2">Gemini API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="border rounded p-2 w-full mb-2"
            />
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold">Dark Mode</label>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {/* Language Selection */}
          <div>
            <label className="text-lg font-semibold mb-2">Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border rounded p-2 w-full mb-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold">Enable Notifications</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary w-fit"
          >
            Save Settings
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
  