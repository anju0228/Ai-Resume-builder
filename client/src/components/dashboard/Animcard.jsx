import React, { useState } from 'react';

export default function Card() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-sm group cursor-pointer"
      >
        {/* Card container with glass effect */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(168, 85, 247, 0.25), 0 0 60px rgba(168, 85, 247, 0.15)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/0 via-transparent to-blue-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

          {/* Image container */}
          <div className="relative h-48 overflow-hidden bg-linear-to-br from-purple-500 via-pink-500 to-red-500">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 seed=%222%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23000%22 filter=%22url(%23noise)%22 /%3E%3C/svg%3E')]" />
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <div className="text-6xl font-bold text-white/20">✨</div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Badge */}
            <div className="mb-4 inline-block">
              <span className="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30">
                Featured
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-2xl font-bold text-white leading-tight">
              Premium Design
            </h2>

            {/* Description */}
            <p className="mb-6 text-slate-300 text-sm leading-relaxed">
              Crafted with attention to detail. This card showcases modern design patterns with smooth interactions.
            </p>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4 py-4 border-y border-slate-700/50">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">99%</p>
                <p className="text-xs text-slate-400 mt-1">Quality</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">4.9★</p>
                <p className="text-xs text-slate-400 mt-1">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400">500+</p>
                <p className="text-xs text-slate-400 mt-1">Users</p>
              </div>
            </div>

            {/* Button */}
            <button
              className="w-full relative overflow-hidden rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Explore More</span>
              <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}