import React from 'react'
import './Chat.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className='chat min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat gap-8 p-4'
    // grid place-items-center 
    style={{backgroundImage: "url('/chat_BG.png')"}}
    >
      <div className="chat-container w-[95%] h-[75vh] max-w-6xl bg-white grid grid-cols-4 rounded-2xl overflow-hidden">
          <div className='col-span-1'><LeftSidebar /></div>
          <div className='col-span-2'><ChatBox /></div>
          <div className='col-span-1'><RightSidebar /></div>
      </div>
    </div>
  )
}

export default Chat
