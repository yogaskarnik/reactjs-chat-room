import React, { useState, useRef } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { validateMessage } from '../utils/validation';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const scroll = useRef();

  const sendMessage = async (event) => {
    event.preventDefault();
    setError('');
    
    const validation = validateMessage(message);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    try {
      const { uid, displayName, photoURL } = auth.currentUser;
      await addDoc(collection(db, 'messages'), {
        text: validation.sanitized,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage('');
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)}>
      {error && <div className="error-message">{error}</div>}
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={500}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
