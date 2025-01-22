import React from 'react'

interface GoogleSignInButtonProps {
  onClick: () => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group relative flex items-center justify-center gap-3 py-3 px-4 
             border border-gray-200 text-lg font-semibold md:text-lg rounded-2xl
             text-white bg-black hover:bg-gray-800 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
             transition-all shadow-sm"
  >
    <img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
    Continue with Google
  </button>
)