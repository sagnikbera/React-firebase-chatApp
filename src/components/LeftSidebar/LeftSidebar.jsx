import React, { useContext, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';

const LeftSidebar = () => {
  const { userData } = useContext(AppContext);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        const querySnap = await getDocs(q);

        //avoid self search
        if (
          !querySnap.empty &&
          querySnap.docs[0].data().id !== auth.currentUser.uid
        ) {
          const data = querySnap.docs[0].data();
          setSearchedUser(data);
        } else {
          setSearchedUser(null);
        }
      } else {
        setShowSearch(false);
        setSearchedUser(null);
      }
    } catch (error) {
      console.error('Search Error: ', error.message);
    }
  };
  return (
    <div className="ls h-full text-white flex flex-col bg-[#053448] rounded-l-2xl overflow-hidden">
      {/* nav top  */}
      <div className="ls-top pt-6 px-4 shrink-0">
        <div className="ls-nav flex items-center justify-between">
          <img src={assets.logo} className="logo max-h-10" alt="logo" />
          {/* menu  */}
          <div className="menu relative group">
            <img
              src={assets.menu_icon}
              alt=""
              className="max-h-8 opacity-80 cursor-pointer"
            />
            {/* onclick sub menu  */}
            <div className="sub-menu hidden group-hover:block absolute  top-full right-5 w-40 p-5 rounded-l-2xl rounded-br-2xl bg-white/20 backdrop-blur-3xl text-black shadow-lg ">
              <p
                className="cursor-pointer text-sm font-semibold hover:font-bold transition-all px-1 py-1 text-center bg-blue-400 hover:bg-blue-500 rounded-2xl"
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </p>

              <hr className="border-none `h-[1px]` bg-[#a5a5a5] my-1" />

              <p className="cursor-pointer text-sm font-semibold hover:font-bold transition-all bg-red-400 hover:bg-red-600 px-3 py-1 text-center rounded-2xl">
                Logout
              </p>
            </div>
          </div>
        </div>
        {/* search  */}
        <div className="ls-search bg-[#041f2b] flex items-center gap-5 px-4 py-2 mt-6 rounded-2xl">
          <img src={assets.search_icon} alt="" className="max-h-5" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none outline-none text-lg placeholder-white/50"
            onChange={inputHandler}
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
                <p>Sagnik Bera</p>
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
