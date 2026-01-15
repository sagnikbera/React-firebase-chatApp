import React, { useState } from 'react';
import assets from '../../assets/assets.js';
import { signup, login, googleLogin } from '../../config/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === 'Sign Up') {
      signup(userName, email, password);
    } else {
      login(email, password);
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
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

      {/* Card */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          {currState}
        </h2>

        {/* Username */}
        {currState === 'Sign Up' && (
          <input
            type="text"
            placeholder="username"
            className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="email address"
          className="bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg text-white placeholder-white/50"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/70"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
        >
          {currState === 'Log In' ? 'Login Now' : 'Create Account'}
        </button>

        {/* OR */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/50 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-sm text-center text-white/70 mt-4">
          {currState === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setCurrState('Log In')}
                className="text-blue-400 cursor-pointer"
              >
                Click Here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setCurrState('Sign Up')}
                className="text-blue-400 cursor-pointer"
              >
                Create Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
