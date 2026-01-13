import React from 'react';
import assets from '../../assets/assets';

const ChatHeader = () => {
  return (
    <div>
      {/* Header */}
      <div className="chat-user px-5 py-3 flex items-center border-b-2 border-b-cyan-400/40">
        <img src={assets.profile_img} alt="" className="w-12 rounded-full" />

        <div className="flex flex-col ml-3">
          <p className="text-white text-xl font-semibold leading-none">
            Sagnik Bera
          </p>
          {/* online  */}
          <div className="flex items-center gap-1 mt-1">
            <p className="text-white/40 text-sm">Online</p>
            <img src={assets.green_dot} alt="" className="w-2.5" />
          </div>
        </div>
        {/* help icon  */}
        <img
          src={assets.help_icon}
          alt=""
          className="help ml-auto w-6 cursor-pointer p-1 bg-gray-300 rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
