import React, { useContext, useEffect, useState, useRef } from 'react';
import assets from '../../assets/assets';
import './ChatBody.css';
import { AppContext } from '../../context/AppContext';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import { uploadImageToCloudinary } from './../../utils/cloudinary';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';

const ChatBox = ({ onBack, onOpenInfo }) => {
  const { userData, chatUser, messages, setMessages, messagesId } =
    useContext(AppContext);
  const [input, setInput] = useState('');
  // input field ref
  const inputRef = useRef(null);
  // chat body ref
  const scrollRef = useRef();

  //page auto-scrolled latest sms
  useEffect(() => {
    if (scrollRef.current) {
      // scrollHeight value scrollTop a set korle akdom niche chole jabe
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  //load chat
  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        setMessages(res.data().messages);
        // setMessages(res.data().messages.reverse());
        // console.log('====================================');
        // console.log(res.data().messages.reverse());
        // console.log('====================================');
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  //message send fn
  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatSnapshot = await getDoc(userChatsRef);

          if (userChatSnapshot.exists()) {
            const userChatData = userChatSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId == messagesId
            );

            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setInput('');
    //focus on input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // send image
  const sendImage = async (e) => {
    try {
      const fileUrl = await uploadImageToCloudinary(e.target.files[0]);

      if (fileUrl && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatSnapshot = await getDoc(userChatsRef);

          if (userChatSnapshot.exists()) {
            const userChatData = userChatSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId == messagesId
            );

            userChatData.chatData[chatIndex].lastMessage = 'Image';
            userChatData.chatData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  //key control - Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  //time generation
  const convertTimestamp = (timestamp) => {
    if (!timestamp) return '';
    let date = timestamp.toDate();
    const hr = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0'); // to ensure it's 2 digit (05)
    if (hr > 12) {
      return hr - 12 + ':' + min + ' PM';
    } else if (hr === 0) {
      return '12:' + min + ' AM';
    } else {
      return hr + ':' + min + ' AM';
    }
  };

  return chatUser ? (
    <div className="h-full flex flex-col bg-[#041f2b]">
      {/* ================= HEADER ================= */}
      <div className="px-5 py-3 flex items-center border-b border-cyan-400/40 shrink-0">
        {/* mobile back */}
        <button onClick={onBack} className="md:hidden mr-2 text-white/80">
          <IoArrowBack size={20} />
        </button>

        <img
          src={chatUser.userData.avatar}
          alt=""
          className="w-12 rounded-full"
        />

        <div className="ml-3">
          <p className="text-white text-lg font-semibold leading-none">
            {chatUser.userData.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {Date.now() - chatUser.userData.lastSeen <= 20000 ? (
              <p className="text-white/40 text-sm">Online</p>
            ) : null}
            {
              // if the user was online for last 70 sec
              Date.now() - chatUser.userData.lastSeen <= 20000 ? (
                <img src={assets.green_dot} alt="" className="w-2.5" />
              ) : null
            }
          </div>
        </div>

        {/* mobile info */}
        <button
          onClick={onOpenInfo}
          className="md:hidden ml-auto text-white/80"
        >
          <IoInformationCircleOutline size={22} />
        </button>

        {/* desktop help icon */}
        <img
          src={assets.help_icon}
          alt=""
          className="hidden md:block ml-auto w-6 p-1 bg-gray-300 rounded-full cursor-pointer"
        />
      </div>

      {/* ================= BODY (SCROLL AREA) ================= */}
      {/* pb-24 keeps space for input */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3" ref={scrollRef}>
        <div className="chat-msg gap-4">
          {messages.map((msg, index) => (
            <div
              className={msg.sId === userData.id ? 's-msg' : 'r-msg'}
              key={index}
            >
              {/* text sms or Image  */}
              {msg['image'] ? (
                <img src={msg.image} alt="" className="msg-img" />
              ) : (
                <p className="msg">{msg.text}</p>
              )}

              {/* avatar */}
              <div className="msg-info">
                <img
                  src={
                    msg.sId === userData.id
                      ? userData.avatar
                      : chatUser.userData.avatar
                  }
                  alt=""
                />
                {/* time  */}
                <p>{convertTimestamp(msg.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INPUT ================= */}
      <div className="shrink-0 px-3 pb-3">
        <div className="flex bg-[#053448] p-3 rounded-2xl items-center">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder-white/30"
            placeholder="Send a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoFocus
          />
          {/* img input  */}
          <input
            onChange={sendImage}
            type="file"
            id="image"
            accept="image/png , image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="bg-gray-200 p-1 rounded-full cursor-pointer"
          >
            <img src={assets.gallery_icon} className="w-6" alt="gallery" />
          </label>

          <img
            src={assets.send_button}
            className="w-8 ml-2 cursor-pointer"
            alt=""
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="chat-welcome flex flex-col items-center my-60">
      <img src={assets.logo_icon} alt="" className="w-32" />
      <p className="text-white/80 font-bold text-2xl">
        Chat Anytime , anytwhere!
      </p>
    </div>
  );
};

export default ChatBox;
