import React from 'react'

export const Logo: React.FC = () => (
  <div className="flex items-center gap-3 text-fuchsia-800">
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
    <h1 className="text-xl md:text-2xl font-bold">TaskBuddy</h1>
  </div>
)