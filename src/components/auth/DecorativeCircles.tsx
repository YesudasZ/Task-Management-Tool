import React from 'react'

export const DecorativeCircles: React.FC = () => (
  <>
    {/* Decorative circles - Desktop */}
    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
      <div className="w-[800px] h-[800px] border-2 border-fuchsia-200 rounded-full" />
      <div className="w-[600px] h-[600px] border-2 border-fuchsia-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="w-[400px] h-[400px] border-2 border-fuchsia-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>

    {/* Decorative circles - Mobile */}
    <div className="md:hidden">
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[400px] border-2 border-purple-200 rounded-full" />
        <div className="w-[300px] h-[300px] border-2 border-purple-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-[200px] h-[200px] border-2 border-purple-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
        <div className="w-[400px] h-[400px] border-2 border-purple-200 rounded-full" />
        <div className="w-[300px] h-[300px] border-2 border-purple-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-[200px] h-[200px] border-2 border-purple-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  </>
)