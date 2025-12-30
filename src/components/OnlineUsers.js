import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'presence'), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setOnlineUsers(users);
    });

    return () => unsubscribe();
  }, []);

  if (onlineUsers.length === 0) return null;

  return (
    <div className="online-users">
      <h4>Online ({onlineUsers.length})</h4>
      <div className="users-list">
        {onlineUsers.map((user) => (
          <div key={user.id} className="online-user">
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
            <div className="status-dot online"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
