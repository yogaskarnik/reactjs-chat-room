import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { validateMessage } from '../utils/validation';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEdit = async () => {
    const validation = validateMessage(editText);
    if (!validation.isValid) return;

    try {
      await updateDoc(doc(db, 'messages', message.id), {
        text: validation.sanitized,
        edited: true
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', message.id));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const isOwner = message.uid === user.uid;

  return (
    <div className={`chat-bubble ${isOwner ? 'right' : ''}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {isEditing ? (
          <div className="edit-message">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              maxLength={500}
            />
            <div className="edit-buttons">
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="user-message">
            {message.text}
            {message.edited && <span className="edited-indicator"> (edited)</span>}
          </p>
        )}
        <div className="message-footer">
          <span className="message-timestamp">{formatTime(message.createdAt)}</span>
          {isOwner && !isEditing && (
            <div className="message-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
