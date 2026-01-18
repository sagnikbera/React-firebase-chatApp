import React, { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import { logout } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { IoCopyOutline } from 'react-icons/io5';

const RightSidebar = () => {
  const { chatUser, messages } = useContext(AppContext);
  const [messageImages, setMessageImages] = useState([]);

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    // console.log(tempVar);
    setMessageImages(tempVar);
  }, [messages]);

  const handleCopy = () => {
    if (chatUser?.userData?.username) {
      navigator.clipboard.writeText(chatUser.userData.username);
      toast.success('Username copied to clipboard!');
    }
  };

  return chatUser ? (
    <div className="h-full text-white flex flex-col bg-[#053448] rounded-r-2xl">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Profile */}
        <div className="flex flex-col items-center text-center">
          <img
            src={chatUser.userData.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />

          <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            {chatUser.userData.name}
            {/* last seen and online dot  */}
            {
              // if the user was online for last 70 sec
              Date.now() - chatUser.userData.lastSeen <= 20000 ? (
                <img src={assets.green_dot} alt="" className="w-2.5" />
              ) : null
            }
          </h3>
          {/* copy username  */}
          <div
            onClick={handleCopy}
            className="mt-2 flex items-center gap-2 cursor-pointer bg-[#041f2b] hover:bg-[#085a7e] px-3 py-1 rounded-full transition-all border border-white/5"
            title="Click to copy"
          >
            <p className="text-xs text-white/60 lowercase font-medium">
              @{chatUser.userData.username}
            </p>
            <IoCopyOutline className="text-white/40 group-hover:text-white text-xs" />
          </div>

          {/* bio  */}
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            {chatUser.userData.bio}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Media */}
        <div>
          <p className="text-sm font-semibold text-gray-200 mb-3">Media</p>
          {/* image  */}
          <div className="grid grid-cols-3 gap-2">
            {messageImages.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="media"
                className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                onClick={() => window.open(url)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ STICKY LOGOUT */}
      <div
        onClick={() => logout()}
        className="sticky bottom-0 bg-[#053448] p-4 border-t border-white/10"
      >
        <button className="w-full bg-[#041f2b] hover:bg-[#085a7e] text-white py-2 rounded-3xl font-medium transition">
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <>
      <div
        onClick={() => logout()}
        className="sticky bottom-0 bg-[#053448] p-4 border-t border-white/10"
      >
        <button className="w-full bg-[#041f2b] hover:bg-[#085a7e] text-white py-2 rounded-3xl font-medium transition">
          Log Out
        </button>
      </div>
    </>
  );
};

export default RightSidebar;
