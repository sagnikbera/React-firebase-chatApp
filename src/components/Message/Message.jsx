import React from 'react';

const Message = ({ isSender, text, imageUrl, time }) => {
  return (
    <div
      className={`flex items-end gap-2 max-w-[75%] ${
        isSender ? 'self-end flex-row-reverse' : ''
      }`}
    >
      {/* avatar */}
      <img src="/profile.png" alt="" className="w-8 h-8 rounded-full" />

      {/* bubble */}
      <div
        className={`p-2 rounded-2xl ${
          isSender
            ? 'bg-blue-600 rounded-br-none'
            : 'bg-[#053448] rounded-bl-none'
        }`}
      >
        {/* IMAGE */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="sent"
            className="max-w-[220px] max-h-[300px] rounded-xl mb-2 object-cover"
          />
        )}

        {/* TEXT */}
        {text && <p className="text-sm text-white leading-relaxed">{text}</p>}

        {/* TIME */}
        <p
          className={`text-[11px] mt-1 ${
            isSender ? 'text-white/70 text-right' : 'text-white/50'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default Message;
