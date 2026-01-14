import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createContext, useState } from 'react';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRefDB = doc(db, 'users', uid);
      const userSnapDB = await getDoc(userRefDB);
      const userDataDB = userSnapDB.data();
      // console.log(userData);
      setUserData(userDataDB);
      //if the avatar & userdata is available then navigate to chat page, otherwise profile update page
      if (userDataDB.avatar && userDataDB.name) {
        navigate('/chat');
      } else {
        navigate('/profile');
      }

      //last seen update
      setInterval(async () => {
        if (auth) {
          await updateDoc(userRefDB, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {}
  };

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
