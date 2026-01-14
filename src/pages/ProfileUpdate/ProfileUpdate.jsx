import React, { useState } from 'react';
import assets from './../../assets/assets';

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);

  return (
    <div
      className="chat min-h-screen flex flex-col items-center justify-center bg-cover bg-bottom bg-no-repeat p-4"
      style={{ backgroundImage: "url('/Edit_BG.jpg')" }}
    >
      {/* card*/}
      <div className="bg-black/30 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-lg relative">
        {/* logo or profile */}
        <img
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt="logo"
          className="w-32 mx-auto bg-[#053448] p-2 rounded-full border border-white/20 shadow-xl"
        />

        <h2 className="text-2xl font-bold text-white text-center mt-2">
          Edit Your Profile
        </h2>

        <form className="flex flex-col gap-4">
          <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">
            Profile Details
          </h3>

          {/* avatar */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer p-3 bg-white/5 border border-dashed border-white/30 rounded-lg hover:bg-white/10 transition group"
          >
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover bg-black/20"
            />
            <span className="text-white/60 text-sm group-hover:text-white transition">
              Upload Profile Image
            </span>
          </label>

          {/* name inp */}
          <input
            type="text"
            placeholder="Your Name"
            className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
            required
          />

          {/* bio */}
          <textarea
            placeholder="Write profile bio"
            className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 transition h-24 resize-none"
            required
          ></textarea>

          {/* btn */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 mt-2"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
