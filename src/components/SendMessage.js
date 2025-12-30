import React, { useState, useRef } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { validateMessage } from '../utils/validation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTypingIndicator } from '../hooks/useTypingIndicator';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);
  const scroll = useRef();
  const { handleTyping, stopTyping } = useTypingIndicator(user);

  const sendMessage = async (event) => {
    event.preventDefault();
    setError('');
    stopTyping();
    
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

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      handleTyping();
    } else {
      stopTyping();
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
        onChange={handleInputChange}
        maxLength={500}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
