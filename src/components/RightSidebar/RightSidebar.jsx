import React from 'react';
import assets from '../../assets/assets';
import { logout } from '../../config/firebase';

const RightSidebar = () => {
  return (
    <div className="h-full text-white flex flex-col bg-[#053448] rounded-r-2xl">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Profile */}
        <div className="flex flex-col items-center text-center">
          <img
            src={assets.profile_img}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />

          <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            Sagnik Bera
            <img src={assets.green_dot} alt="online" className="w-2.5 h-2.5" />
          </h3>

          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            Hey, There I am Sagnik Bera using Chat App.
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Media */}
        <div>
          <p className="text-sm font-semibold text-gray-200 mb-3">Media</p>

          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src={assets.pic2}
                alt="media"
                className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
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
  );
};

export default RightSidebar;
