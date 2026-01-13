import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

const ChatBox = () => {
  return (
    <div className="chat-box h-full bg-[#041f2b] flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <ChatBody />
      </div>

      <div className="sticky bottom-3 bg-[#041f2b] pt-2">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatBox;
