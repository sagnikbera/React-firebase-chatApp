import React from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';

const LeftSidebar = () => {
  return (
    <div className="ls h-full text-white flex flex-col bg-[#053448] rounded-l-2xl overflow-hidden">
      {/* nav top  */}
      <div className="ls-top pt-6 px-4 shrink-0">
        <div className="ls-nav flex items-center justify-between">
          <img src={assets.logo} className="logo max-h-10" alt="logo" />
          {/* menu  */}
          <div className="menu">
            <img
              src={assets.menu_icon}
              alt=""
              className="max-h-8 opacity-80 cursor-pointer"
            />
          </div>
        </div>
        {/* search  */}
        <div className="ls-search bg-[#041f2b] flex items-center gap-5 px-4 py-2 mt-6 rounded-2xl">
          <img src={assets.search_icon} alt="" className="max-h-5" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none outline-none text-lg placeholder-white/50"
          />
        </div>
      </div>

      {/* list  */}
      <div className="ls-list flex flex-col h-[70%] overflow-y-scroll no-scrollbar text-md pb-24">
        {Array(12)
          .fill('')
          .map((item, index) => (
            <div
              className="friends flex items-center px-4 gap-5 py-2 mt-1 cursor-pointer hover:bg-[#041f2b]/50"
              key={index}
            >
              <img
                src={assets.profile_img}
                alt=""
                className="w-12 aspect-square rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p>Richard Sanford</p>
                <span className="text-sm text-white/70">
                  Hello , How are you?
                </span>
              </div>
            </div>
          ))}
        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
