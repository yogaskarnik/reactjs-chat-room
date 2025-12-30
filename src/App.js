import './App.css';
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import ErrorBoundary from './components/ErrorBoundary';
import { useState } from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <ErrorBoundary>
      <div className="App">
        <NavBar />
        {!user ? (
          <Welcome />
        ) : (
          <>
            <ChatBox />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
