import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';

export const useTypingIndicator = (user) => {
  const typingTimeoutRef = useRef(null);

  const startTyping = async () => {
    if (!user) return;
    
    try {
      await setDoc(doc(db, 'typing', user.uid), {
        name: user.displayName,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error setting typing status:', error);
    }
  };

  const stopTyping = async () => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, 'typing', user.uid));
    } catch (error) {
      console.error('Error removing typing status:', error);
    }
  };

  const handleTyping = () => {
    startTyping();
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      stopTyping();
    };
  }, []);

  return { handleTyping, stopTyping };
};
