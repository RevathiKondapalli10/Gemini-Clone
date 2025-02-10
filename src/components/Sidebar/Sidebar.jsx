import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Load a saved prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        {/* Toggle Sidebar */}
        <img 
          onClick={() => setExtended((prev) => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu Icon"
        />

        {/* New Chat */}
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.length > 0 ? (
              previousPrompts.map((item, index) => (
                <div 
                  className="recent-entry" 
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            ) : (
              <p className="no-recent">No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        {/* Help */}
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        {/* Activity */}
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        {/* Settings */}
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
