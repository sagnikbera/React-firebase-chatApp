import React, { useContext, useEffect, useState } from 'react';
import assets from './../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadImageToCloudinary } from '../../utils/cloudinary';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const { setUserData } = useContext(AppContext);

  const navigate = useNavigate();

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error('Upload Profile Picture!');
        return;
      }
      const docRef = doc(db, 'users', uid);
      if (image) {
        const imageUrl = await uploadImageToCloudinary(image);
        setPrevImage(imageUrl);
        await updateDoc(docRef, {
          avatar: imageUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      toast.success('Profile updated successfully!');
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  //loading data from database
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setBio(data.bio || '');
          setPrevImage(data.avatar || '');
        }
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div
      className="chat min-h-screen flex flex-col items-center justify-center bg-cover bg-bottom bg-no-repeat p-4"
      style={{ backgroundImage: "url('/Edit_BG.jpg')" }}
    >
      {/* card*/}
      <div className="bg-black/30 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-6 w-full max-w-lg relative">
        {/* logo or profile */}
        <img
          src={
            image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon
          }
          alt="logo"
          className="w-32 h-32 mx-auto bg-[#053448] p-2 rounded-full border border-white/20 shadow-xl object-cover"
        />

        <h2 className="text-2xl font-bold text-white text-center mt-2">
          Edit Your Profile
        </h2>

        <form onSubmit={profileUpdate} className="flex flex-col gap-4">
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
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage || assets.avatar_icon
              }
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          {/* bio */}
          <textarea
            placeholder="Write profile bio"
            className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-blue-400 transition h-24 resize-none"
            required
            onChange={(e) => setBio(e.target.value)}
            value={bio}
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
