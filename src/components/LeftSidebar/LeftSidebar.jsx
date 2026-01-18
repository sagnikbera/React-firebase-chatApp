import React, { useContext, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const LeftSidebar = () => {
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    logout,
  } = useContext(AppContext);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        const querySnap = await getDocs(q);

        //avoid self search
        if (
          !querySnap.empty &&
          querySnap.docs[0].data().id !== auth.currentUser.uid
        ) {
          const data = querySnap.docs[0].data();
          //update chat data --> if already in chat list
          let userExist = false;
          chatData.map((searchedUser) => {
            if (searchedUser.rId === data.id) {
              userExist = true;
            }
          });
          //set
          if (!userExist) {
            setSearchedUser(data);
          }
        } else {
          setSearchedUser(null);
        }
      } else {
        setShowSearch(false);
        setSearchedUser(null);
      }
    } catch (error) {
      console.error('Search Error: ', error.message);
    }
  };

  //add user's chat data whenever clicked on it
  const addChat = async () => {
    // cheacking it is already present or not
    const isAlreadyAdded = chatData.some(
      (chat) => chat.rId === searchedUser.id
    );

    if (isAlreadyAdded) {
      setShowSearch(false);
      setSearchedUser(null);
      return;
    }

    //===========
    const messageRef = collection(db, 'messages');
    const chatsRef = collection(db, 'chats');
    try {
      const newMessageRef = doc(messageRef);
      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(chatsRef, searchedUser.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: '',
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
      await updateDoc(doc(chatsRef, userData.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: '',
          rId: searchedUser.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  //set chat
  const setChat = async (item) => {
    try {
      // console.log(item);
      setMessagesId(item.messageId);
      setChatUser(item);
      //seen logic
      if (!item.messageSeen) {
        const userChatsRef = doc(db, 'chats', userData.id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        const userChatData = userChatsSnapshot.data();
        const chatIndex = userChatData.chatData.findIndex(
          (c) => c.messageId == item.messageId
        );
        if (chatIndex !== -1) {
          userChatData.chatData[chatIndex].messageSeen = true;
          await updateDoc(userChatsRef, {
            chatData: userChatData.chatData,
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="ls h-full text-white flex flex-col bg-[#053448] rounded-l-2xl overflow-hidden">
      {/* nav top  */}
      <div className="ls-top pt-6 px-4 shrink-0">
        <div className="ls-nav flex items-center justify-between">
          <img src={assets.logo} className="logo max-h-10" alt="logo" />
          {/* menu  */}
          <div className="menu relative group">
            <img
              src={assets.menu_icon}
              alt=""
              className="max-h-8 opacity-80 cursor-pointer"
            />
            {/* onclick sub menu  */}
            <div className="sub-menu hidden group-hover:block absolute  top-full right-5 w-40 p-5 rounded-l-2xl rounded-br-2xl bg-white/20 backdrop-blur-3xl text-black shadow-lg ">
              <p
                className="cursor-pointer text-sm font-semibold hover:font-bold transition-all px-1 py-1 text-center bg-blue-400 hover:bg-blue-500 rounded-2xl"
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </p>

              <hr className="border-none `h-[1px]` bg-[#a5a5a5] my-1" />

              <p
                className="cursor-pointer text-sm font-semibold hover:font-bold transition-all bg-red-400 hover:bg-red-600 px-3 py-1 text-center rounded-2xl"
                onClick={() => logout()}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        {/* search  */}
        <div className="ls-search bg-[#041f2b] flex items-center gap-5 px-4 py-2 mt-6 rounded-2xl">
          <img src={assets.search_icon} alt="" className="max-h-5" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none outline-none text-lg placeholder-white/50"
            onChange={inputHandler}
          />
        </div>
      </div>

      {/* list  */}
      <div className="ls-list flex flex-col h-[70%] overflow-y-scroll no-scrollbar text-md pb-24">
        {
          //searched list
          showSearch && searchedUser ? (
            <div
              className="friend add-user  flex items-center px-4 gap-5 py-2 mt-1 cursor-pointer hover:bg-[#041f2b]/50"
              onClick={addChat}
            >
              <img
                src={searchedUser.avatar}
                alt=""
                className="w-12 aspect-square rounded-full object-cover"
              />
              <p className="text-white ">{searchedUser.name}</p>
            </div>
          ) : (
            //general list
            chatData?.map((item, index) => (
              <div
                className={`friends flex items-center px-4 gap-5 py-2 mt-1 cursor-pointer hover:bg-[#041f2b]/50 ${item.messageSeen || item.messageId == messagesId ? '' : 'bg-[#041f2b]/50'}`}
                key={index}
                onClick={() => setChat(item)}
              >
                <img
                  src={item.userData?.avatar}
                  alt=""
                  className={`w-12 aspect-square rounded-full object-cover ${item.messageSeen || item.messageId == messagesId ? '' : 'border-2 border-cyan-400'}`}
                />
                <div className="flex flex-col">
                  <p>{item.userData?.name || 'Unknown User'}</p>
                  <span
                    className={`text-sm  ${item.messageSeen || item.messageId == messagesId ? 'text-white/70' : 'text-cyan-400 font-bold'}`}
                  >
                    {item.lastMessage || 'No messages yet'}
                  </span>
                </div>
              </div>
            ))
          )
        }

        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
