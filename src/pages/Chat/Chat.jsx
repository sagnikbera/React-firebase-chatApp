import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { AppContext } from '../../context/AppContext';
import { ImSpinner8 } from 'react-icons/im';

const Chat = () => {
  const { userData, chatData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // mobile view control (UI only)
  const [showChatBox, setShowChatBox] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const openChat = () => {
    setShowChatBox(true);
    setShowInfo(false);
  };

  const closeChat = () => {
    setShowChatBox(false);
    setShowInfo(false);
  };

  const openInfo = () => {
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div
      className="chat min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/chat_BG.png')" }}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <ImSpinner8 className="text-white text-6xl animate-spin opacity-80" />
          <p className="loading text-white text-xl font-medium tracking-widest animate-pulse">
            Loading....
          </p>
        </div>
      ) : (
        <div className="chat-container w-[95%] max-w-6xl h-[90vh] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          {/* ===== DESKTOP VIEW ===== */}
          <div className="hidden md:grid md:grid-cols-4 h-full min-h-0">
            {/* LEFT */}
            <div className="col-span-1 h-full min-h-0">
              <LeftSidebar />
            </div>

            {/* CENTER (CHAT) */}
            <div
              className="col-span-2 h-full min-h-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/chat_BG.png')" }}
            >
              <ChatBox />
            </div>

            {/* RIGHT */}
            <div className="col-span-1 h-full min-h-0">
              <RightSidebar />
            </div>
          </div>

          {/* ===== MOBILE VIEW ===== */}
          <div className="md:hidden h-full">
            {!showChatBox && <LeftSidebar onOpenChat={openChat} />}

            {showChatBox && !showInfo && (
              <ChatBox onBack={closeChat} onOpenInfo={openInfo} />
            )}

            {showChatBox && showInfo && <RightSidebar onBack={closeInfo} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
