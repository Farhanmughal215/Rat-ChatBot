import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MemeFactory from './components/MemeFactory';
import RatManifesto from './components/RatManifesto';
import Tokenomics from './components/Tokenomics';
import Games from './components/Games';
import RevolutionMap from './components/RevolutionMap';
import SewerCitizens from './components/SewerCitizens';
import HelpFAQ from './components/HelpFAQ';
import Settings from './components/Settings';

function App() {
  const [activeSection, setActiveSection] = useState('assistant');
  const [username, setUsername] = useState('$RAT');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile when section changes
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'memes':
        return <MemeFactory />;
      case 'manifesto':
        return <RatManifesto />;
      case 'tokenomics':
        return <Tokenomics />;
      case 'games':
        return <Games />;
      case 'roadmap':
        return <RevolutionMap />;
      case 'community':
        return <SewerCitizens />;
      case 'help':
        return <HelpFAQ />;
      case 'settings':
        return <Settings username={username} onUsernameChange={handleUsernameChange} />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Header username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;