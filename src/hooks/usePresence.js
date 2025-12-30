import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const usePresence = (user) => {
  useEffect(() => {
    if (!user) return;

    const setOnline = async () => {
      try {
        await setDoc(doc(db, 'presence', user.uid), {
          name: user.displayName,
          avatar: user.photoURL,
          status: 'online',
          lastSeen: serverTimestamp()
        });
      } catch (error) {
        console.error('Error setting online status:', error);
      }
    };

    const setOffline = async () => {
      try {
        await deleteDoc(doc(db, 'presence', user.uid));
      } catch (error) {
        console.error('Error setting offline status:', error);
      }
    };

    setOnline();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOffline();
      } else {
        setOnline();
      }
    };

    const handleBeforeUnload = () => {
      setOffline();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setOffline();
    };
  }, [user]);
};
