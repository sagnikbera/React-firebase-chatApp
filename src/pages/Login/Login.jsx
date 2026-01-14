import React, { useState } from 'react';
import assets from '../../assets/assets.js';
import { signup } from '../../config/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [currState, setCurrState] = useState('Sign Up');

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userName, email, password);
    if (currState === 'Sign Up') {
      signup(userName, email, password);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat gap-8 p-4"
      style={{ backgroundImage: "url('/Login_BG.jpg')" }}
    >
      {/* Logo */}
      <img
        src={assets.logo_big}
        alt="Logo"
        className="w-32 md:w-40 mx-auto p-2 bg-black/10 rounded-4xl"
      />

      {/* Card*/}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {currState}
        </h2>

        {/* inp */}
        {currState === 'Sign Up' && (
          <input
            type="text"
            placeholder="username"
            className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-blue-400 transition"
            required
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        )}
        <input
          type="email"
          placeholder="email address"
          className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-blue-400 transition"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-blue-400 transition"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/50 hover:text-white transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>

        {/* sbmt  */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 mt-2"
        >
          {currState === 'Log In' ? 'Login Now' : 'Create Account'}
        </button>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 cursor-pointer accent-blue-600"
            required
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/80 cursor-pointer"
          >
            Agree to the terms and condition
          </label>
        </div>

        {/* login || signup */}
        <div className="text-center mt-4">
          {currState === 'Sign Up' ? (
            <p className="text-sm text-white/60">
              Already have an account?{' '}
              <span
                className="text-blue-400 font-semibold cursor-pointer hover:underline"
                onClick={() => setCurrState('Log In')}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-white/60">
              Don't have an account?{' '}
              <span
                className="text-blue-400 font-semibold cursor-pointer hover:underline"
                onClick={() => setCurrState('Sign Up')}
              >
                Create Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
