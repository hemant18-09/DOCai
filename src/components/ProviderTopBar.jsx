import React from 'react';
import './TopBar.css';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <header className="top-bar">
      <div className="header-title">{title}</div>
      <div className="header-right">
        <button className="btn btn-outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <div className="user-info">
          <div className="user-details">
            <div className="user-name">Dr. Sarah Chen</div>
            <div className="user-role">Primary Care</div>
          </div>
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Dr. Sarah Chen"
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
