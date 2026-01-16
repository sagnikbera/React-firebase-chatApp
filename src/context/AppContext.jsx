import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { createContext, useEffect, useState, useRef } from 'react';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  const intervalRef = useRef(null);

  const loadUserData = async (uid) => {
    try {
      const userRefDB = doc(db, 'users', uid);
      const userSnapDB = await getDoc(userRefDB);
      const userData = userSnapDB.data();
      // console.log(userData);
      setUserData(userData);
      //if the avatar & userdata is available then navigate to chat page, otherwise profile update page
      const isProfileComplete =
        userData.avatar?.trim() &&
        userData.name?.trim() &&
        userData.bio?.trim();

      if (isProfileComplete) {
        navigate('/chat');
      } else {
        navigate('/profile');
      }

      //last seen update
      // --- UPDATED: Clear existing interval before starting a new one to prevent multiple timers ---
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // --- UPDATED: Set the interval and store its ID in the ref ---
      intervalRef.current = setInterval(async () => {
        if (auth.currentUser) {
          // Better to check auth.currentUser
          await updateDoc(userRefDB, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {}
  };

  //chat data
  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, 'chats', userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatData;
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, 'users', item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });

      return () => {
        unSub(); // <- stop listing (break connection)
        // --- UPDATED: Clear interval when the component or effect cleans up ---
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    chatUser,
    setChatUser,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
