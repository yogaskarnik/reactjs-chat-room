import './App.css';
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import OnlineUsers from './components/OnlineUsers';
import ErrorBoundary from './components/ErrorBoundary';
import { useState } from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usePresence } from './hooks/usePresence';

function App() {
  const [user] = useAuthState(auth);
  usePresence(user);

  return (
    <ErrorBoundary>
      <div className="App">
        <NavBar />
        {!user ? (
          <Welcome />
        ) : (
          <div className="chat-layout">
            <OnlineUsers />
            <ChatBox />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
