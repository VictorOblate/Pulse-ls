"use client"

import React from 'react'

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large square */}
      <div className="absolute top-1/4 -right-20 w-60 h-60 opacity-[0.03] animate-rotate-slow">
        <div className="w-full h-full border-[2px] border-sky-500 transform rotate-45"></div>
      </div>

      {/* Small triangles */}
      <div className="absolute top-1/3 left-10 w-20 h-20 opacity-[0.02] animate-float-slow">
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-b-[60px] border-b-sky-400 border-r-[40px] border-r-transparent"></div>
      </div>

      {/* Medium circle */}
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-[0.015] animate-pulse-slow">
        <div className="w-full h-full rounded-full border-[2px] border-sky-300"></div>
      </div>

      {/* Small square */}
      <div className="absolute top-2/3 left-1/3 w-16 h-16 opacity-[0.02] animate-bounce-slow">
        <div className="w-full h-full border-[2px] border-sky-400 transform -rotate-12"></div>
      </div>

      {/* Diagonal lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.01]">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-300 to-transparent transform -rotate-12"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent transform rotate-12"></div>
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sky-300 rounded-full opacity-[0.03] animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}