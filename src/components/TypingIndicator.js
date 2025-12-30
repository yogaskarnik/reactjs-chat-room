import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const TypingIndicator = () => {
  const [user] = useAuthState(auth);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'typing'), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        if (doc.id !== user?.uid) {
          users.push(doc.data());
        }
      });
      setTypingUsers(users);
    });

    return () => unsubscribe();
  }, [user]);

  if (typingUsers.length === 0) return null;

  return (
    <div className="typing-indicator">
      <span className="typing-text">
        {typingUsers.length === 1
          ? `${typingUsers[0].name} is typing...`
          : `${typingUsers.length} people are typing...`}
      </span>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
