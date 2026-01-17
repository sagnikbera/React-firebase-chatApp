import React, { useContext, useEffect, useState } from 'react';
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

const ChatBox = () => {
  const { userData, chatUser, messages, setMessages, messagesId } =
    useContext(AppContext);
  const [input, setInput] = useState('');

  //load chat
  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
        setMessages(res.data().messages.reverse());
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
  };

  return chatUser ? (
    <div className="h-full flex flex-col bg-[#041f2b]">
      {/* ================= HEADER ================= */}
      <div className="px-5 py-3 flex items-center border-b border-cyan-400/40 shrink-0">
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
            <p className="text-white/40 text-sm">Online</p>
            <img src={assets.green_dot} alt="" className="w-2.5" />
          </div>
        </div>

        <img
          src={assets.help_icon}
          alt=""
          className="ml-auto w-6 p-1 bg-gray-300 rounded-full cursor-pointer"
        />
      </div>

      {/* ================= BODY (SCROLL AREA) ================= */}
      {/* pb-24 keeps space for input */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 pb-24">
        <div className="chat-msg flex flex-col gap-4">
          {/* TEXT MESSAGE */}
          <div className="r-msg">
            <p className="msg">Hey 👋 This is a text message</p>
            <div className="msg-info">
              <img src={assets.profile_img} alt="" />
              <p>2:30 PM</p>
            </div>
          </div>

          {/* IMAGE MESSAGE */}
          <div className="s-msg">
            <img src={assets.pic1} alt="sent-img" className="msg-img" />
            <div className="msg-info">
              <img src={assets.profile_img} alt="" />
              <p>2:31 PM</p>
            </div>
          </div>

          {/* TEXT MESSAGE */}
          <div className="s-msg">
            <p className="msg">Image ta properly fit hocche to? 😄</p>
            <div className="msg-info">
              <img src={assets.profile_img} alt="" />
              <p>2:32 PM</p>
            </div>
          </div>

          {/* IMAGE MESSAGE */}
          <div className="r-msg">
            <img src={assets.pic1} alt="recv-img" className="msg-img" />
            <div className="msg-info">
              <img src={assets.profile_img} alt="" />
              <p>2:33 PM</p>
            </div>
          </div>

          {/* MORE DUMMY TEXT */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className={i % 2 ? 's-msg' : 'r-msg'}>
              <p className="msg">Dummy message {i + 1}</p>
              <div className="msg-info">
                <img src={assets.profile_img} alt="" />
                <p>2:{34 + i} PM</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= INPUT ================= */}
      <div className="shrink-0 px-3 pb-3">
        <div className="flex bg-[#053448] p-3 rounded-2xl items-center">
          <input
            className="flex-1 bg-transparent outline-none text-white placeholder-white/30"
            placeholder="Send a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          <label className="bg-gray-200 p-1 rounded-full cursor-pointer">
            <img src={assets.gallery_icon} className="w-6 opacity-60" alt="" />
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
