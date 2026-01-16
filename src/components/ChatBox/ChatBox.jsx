import React, { useContext } from 'react';
import assets from '../../assets/assets';
import './ChatBody.css';
import { AppContext } from '../../context/AppContext';

const ChatBox = () => {
  const { userData, chatUser, messages, setMessages, messagesId } =
    useContext(AppContextt);

  return (
    <div className="h-full flex flex-col bg-[#041f2b]">
      {/* ================= HEADER ================= */}
      <div className="px-5 py-3 flex items-center border-b border-cyan-400/40 shrink-0">
        <img src={assets.profile_img} alt="" className="w-12 rounded-full" />

        <div className="ml-3">
          <p className="text-white text-lg font-semibold leading-none">
            Sagnik Bera
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
          />

          <label className="bg-gray-200 p-1 rounded-full cursor-pointer">
            <img src={assets.gallery_icon} className="w-6 opacity-60" alt="" />
          </label>

          <img
            src={assets.send_button}
            className="w-8 ml-2 cursor-pointer"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
