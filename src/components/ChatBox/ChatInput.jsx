import React from 'react';
import assets from '../../assets/assets';

const ChatInput = () => {
  return (
    <div className="flex bg-[#053448] p-2 mx-2 rounded-2xl">
      <input
        className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-white/30"
        type="text"
        placeholder="Send a message"
      />

      {/* img input  */}
      <input type="file" id="image" accept="image/png , image/jpeg" hidden />
      <label
        htmlFor="image"
        className="flex cursor-pointer bg-gray-200 p-1 rounded-full"
      >
        <img
          src={assets.gallery_icon}
          className="w-6 opacity-60 hover:opacity-100"
          alt="gallery"
        />
      </label>
      {/* send sms  */}
      <img
        src={assets.send_button}
        className="w-8 cursor-pointer active:scale-90 transition-transform ml-2"
        alt="send"
      />
    </div>
  );
};

export default ChatInput;
