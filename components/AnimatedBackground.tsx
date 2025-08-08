
import React, { useEffect, useState } from "react";

export default function AnimatedBackground({ fadeOut = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Space Objects Background */}
      <div className={`space-background ${fadeOut ? "fade-out" : ""}`}>
        {/* Stars */}
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        {/* Floating Robots */}
        <div className="floating-object robot robot-1">🤖</div>
        <div className="floating-object robot robot-2">🤖</div>
        <div className="floating-object robot robot-3">🤖</div>
        <div className="floating-object robot robot-4">🤖</div>
        
        {/* Floating Aliens */}
        <div className="floating-object alien alien-1">👽</div>
        <div className="floating-object alien alien-2">🛸</div>
        <div className="floating-object alien alien-3">👾</div>
        <div className="floating-object alien alien-4">👽</div>
        <div className="floating-object alien alien-5">🛸</div>
        
        {/* Floating Satellites */}
        <div className="floating-object satellite satellite-1">🛰️</div>
        <div className="floating-object satellite satellite-2">🚀</div>
        <div className="floating-object satellite satellite-3">🛰️</div>
        <div className="floating-object satellite satellite-4">🚀</div>
        <div className="floating-object satellite satellite-5">🛰️</div>
        
        {/* Additional Space Objects */}
        <div className="floating-object space space-1">🌌</div>
        <div className="floating-object space space-2">🌠</div>
        <div className="floating-object space space-3">💫</div>
        <div className="floating-object space space-4">⭐</div>
        <div className="floating-object space space-5">🌟</div>
      </div>

      <style jsx global>{`
        .space-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #0a0a23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a23 100%);
          z-index: -10;
          overflow: hidden;
          opacity: 1;
          transition: opacity 1s ease-out;
        }

        .space-background.fade-out {
          opacity: 0;
        }

        /* Animated Stars */
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 130px 80px, #fff, transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.9), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: twinkle 10s linear infinite;
        }

        .stars2 {
          background-image: 
            radial-gradient(1px 1px at 50px 50px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 100px 20px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 150px 90px, rgba(255,255,255,0.8), transparent);
          background-repeat: repeat;
          background-size: 250px 150px;
          animation: twinkle 15s linear infinite reverse;
        }

        .stars3 {
          background-image: 
            radial-gradient(1px 1px at 75px 25px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 125px 75px, rgba(255,255,255,0.6), transparent);
          background-repeat: repeat;
          background-size: 300px 200px;
          animation: twinkle 20s linear infinite;
        }

        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        /* Floating Objects Base Styles */
        .floating-object {
          position: absolute;
          font-size: 2.5rem;
          opacity: 0.8;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          pointer-events: none;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
          z-index: -5;
        }

        /* Robot Animations */
        .robot {
          animation-name: float-robots;
          color: #00ff88;
          text-shadow: 0 0 20px #00ff88, 0 0 40px #00ff88;
        }

        .robot-1 {
          top: 20%;
          left: 10%;
          animation-duration: 25s;
          animation-delay: 0s;
          font-size: 3rem;
        }

        .robot-2 {
          top: 60%;
          right: 15%;
          animation-duration: 30s;
          animation-delay: -5s;
          font-size: 2rem;
        }

        .robot-3 {
          top: 80%;
          left: 70%;
          animation-duration: 28s;
          animation-delay: -10s;
          font-size: 2.5rem;
        }

        .robot-4 {
          top: 15%;
          right: 40%;
          animation-duration: 35s;
          animation-delay: -15s;
          font-size: 2.2rem;
        }

        /* Alien Animations */
        .alien {
          animation-name: float-aliens;
          color: #ff00ff;
          text-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
        }

        .alien-1 {
          top: 30%;
          left: 20%;
          animation-duration: 22s;
          animation-delay: -2s;
          font-size: 2.8rem;
        }

        .alien-2 {
          top: 10%;
          left: 60%;
          animation-duration: 26s;
          animation-delay: -7s;
          font-size: 3.2rem;
        }

        .alien-3 {
          top: 70%;
          right: 25%;
          animation-duration: 24s;
          animation-delay: -12s;
          font-size: 2.3rem;
        }

        .alien-4 {
          top: 50%;
          left: 5%;
          animation-duration: 32s;
          animation-delay: -18s;
          font-size: 2.6rem;
        }

        .alien-5 {
          top: 85%;
          right: 50%;
          animation-duration: 29s;
          animation-delay: -22s;
          font-size: 2.9rem;
        }

        /* Satellite Animations */
        .satellite {
          animation-name: float-satellites;
          color: #00ccff;
          text-shadow: 0 0 20px #00ccff, 0 0 40px #00ccff;
        }

        .satellite-1 {
          top: 25%;
          right: 10%;
          animation-duration: 27s;
          animation-delay: -3s;
          font-size: 2.4rem;
        }

        .satellite-2 {
          top: 5%;
          left: 30%;
          animation-duration: 31s;
          animation-delay: -8s;
          font-size: 3.5rem;
        }

        .satellite-3 {
          top: 65%;
          left: 40%;
          animation-duration: 25s;
          animation-delay: -13s;
          font-size: 2.1rem;
        }

        .satellite-4 {
          top: 45%;
          right: 5%;
          animation-duration: 33s;
          animation-delay: -19s;
          font-size: 3.1rem;
        }

        .satellite-5 {
          top: 90%;
          left: 80%;
          animation-duration: 28s;
          animation-delay: -25s;
          font-size: 2.7rem;
        }

        /* Space Objects */
        .space {
          animation-name: float-space;
          color: #ffff00;
          text-shadow: 0 0 20px #ffff00, 0 0 40px #ffff00;
        }

        .space-1 {
          top: 35%;
          left: 75%;
          animation-duration: 40s;
          animation-delay: -5s;
          font-size: 2.0rem;
        }

        .space-2 {
          top: 55%;
          right: 35%;
          animation-duration: 45s;
          animation-delay: -15s;
          font-size: 1.8rem;
        }

        .space-3 {
          top: 75%;
          left: 25%;
          animation-duration: 38s;
          animation-delay: -25s;
          font-size: 1.5rem;
        }

        .space-4 {
          top: 95%;
          right: 70%;
          animation-duration: 42s;
          animation-delay: -35s;
          font-size: 1.2rem;
        }

        .space-5 {
          top: 5%;
          left: 85%;
          animation-duration: 50s;
          animation-delay: -45s;
          font-size: 1.6rem;
        }

        /* Animation Keyframes */
        @keyframes float-robots {
          0% { transform: translateX(-50px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(50px) translateY(-30px) rotate(90deg); }
          50% { transform: translateX(100px) translateY(0px) rotate(180deg); }
          75% { transform: translateX(50px) translateY(30px) rotate(270deg); }
          100% { transform: translateX(-50px) translateY(0px) rotate(360deg); }
        }

        @keyframes float-aliens {
          0% { transform: translateY(0px) translateX(0px) scale(1); }
          20% { transform: translateY(-40px) translateX(30px) scale(1.1); }
          40% { transform: translateY(-20px) translateX(-20px) scale(0.9); }
          60% { transform: translateY(20px) translateX(40px) scale(1.05); }
          80% { transform: translateY(40px) translateX(-30px) scale(0.95); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }

        @keyframes float-satellites {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          25% { transform: rotate(90deg) translateX(80px) rotate(-90deg); }
          50% { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
          75% { transform: rotate(270deg) translateX(80px) rotate(-270deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        @keyframes float-space {
          0% { transform: translateY(0px) scale(0.8) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-50px) scale(1.2) rotate(120deg); opacity: 1; }
          66% { transform: translateY(25px) scale(0.9) rotate(240deg); opacity: 0.8; }
          100% { transform: translateY(0px) scale(0.8) rotate(360deg); opacity: 0.6; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .floating-object {
            font-size: 1.5rem;
          }
          
          .robot-1, .alien-2, .satellite-2, .satellite-4 {
            font-size: 2rem;
          }
        }

        /* Hover effects for interactivity */
        .floating-object:hover {
          transform: scale(1.3) !important;
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
}
