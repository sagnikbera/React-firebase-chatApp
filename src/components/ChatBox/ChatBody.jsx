import React from 'react';
import './ChatBody.css';
import assets from '../../assets/assets';

const ChatBody = () => {
  return (
    <div className="chat-msg h-[58%] overflow-y-auto flex flex-col-reverse px-3 py-2 gap-4">
      {/* SENDER – IMAGE */}
      <div className="s-msg">
        <img src={assets.pic1} alt="sent-img" className="msg-img" />

        <div className="msg-info">
          <img src={assets.profile_img} alt="profile" />
          <p>2:30 PM</p>
        </div>
      </div>

      {/* SENDER – TEXT */}
      <div className="s-msg">
        <p className="msg">
          Lorem ipsum is placeholder text commonly used in the graphic.
        </p>

        <div className="msg-info">
          <img src={assets.profile_img} alt="profile" />
          <p>2:31 PM</p>
        </div>
      </div>

      {/* RECEIVER – IMAGE */}
      <div className="r-msg">
        <img src={assets.pic1} alt="recv-img" className="msg-img" />

        <div className="msg-info">
          <img src={assets.profile_img} alt="profile" />
          <p>2:32 PM</p>
        </div>
      </div>

      {/* RECEIVER – TEXT */}
      <div className="r-msg">
        <p className="msg">
          Lorem ipsum is placeholder text commonly used in the graphic.
        </p>

        <div className="msg-info">
          <img src={assets.profile_img} alt="profile" />
          <p>2:33 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
