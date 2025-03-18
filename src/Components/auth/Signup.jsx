import React from "react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

import { app } from "../../app/firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email & Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      alert("Signup Successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Authentication
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Signup Successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Or sign up with</p>
          <button
            onClick={handleGoogleSignup}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.6-6.6C34.4 2 29.4 0 24 0 14.6 0 6.6 5.8 2.6 14.2l7.9 6.2c1.6-4.9 6.1-8.3 11.5-8.3z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.2 24.5c0-1.5-.1-2.9-.4-4.2H24v8.5h12.8c-.6 3.2-2.5 5.9-5.3 7.6l7.9 6.1c4.6-4.3 7.8-10.6 7.8-17.9z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-2.9.8-4.3l-7.9-6.1C1 16.3 0 20 0 24s1 7.7 2.6 10.4l7.9-6.1z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6.1c-2.1 1.4-4.7 2.2-7.9 2.2-5.4 0-9.9-3.5-11.5-8.3l-7.9 6.2C6.6 42.2 14.6 48 24 48z"
              ></path>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
