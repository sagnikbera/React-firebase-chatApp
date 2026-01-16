import React from 'react';
import './Chat.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSidebar from '../../components/RightSidebar/RightSidebar';

const Chat = () => {
  return (
    <div
      className="chat min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/chat_BG.png')" }}
    >
      {/* FIX: give container a HEIGHT */}
      <div className="chat-container w-[95%] max-w-6xl h-[90vh] bg-white/10 backdrop-blur-md grid grid-cols-4 rounded-2xl overflow-hidden">
        {/* LEFT */}
        <div className="col-span-1 h-full min-h-0">
          <LeftSidebar />
        </div>

        {/* CENTER (CHAT) */}
        <div className="col-span-2 h-full min-h-0">
          <ChatBox />
        </div>

        {/* RIGHT */}
        <div className="col-span-1 h-full min-h-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Chat;
