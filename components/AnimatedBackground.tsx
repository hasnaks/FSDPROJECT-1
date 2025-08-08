
import React from "react";

export default function AnimatedBackground({ fadeOut = false }) {
  return (
    <div className={`animated-bg ${fadeOut ? "fade-out" : ""}`}>
      <style jsx global>{`
        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, #0ff, #005, #000);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999; /* On top */
          opacity: 1;
          transition: opacity 1s ease-out;
        }

        .animated-bg.fade-out {
          opacity: 0;
        }

        /* Wormhole vortex */
        .animated-bg::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 12px solid rgba(0, 255, 255, 0.6);
          border-top: 12px solid rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          animation: vortex-spin 1s linear infinite, vortex-pulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 60px rgba(0, 255, 255, 0.8),
                      0 0 100px rgba(0, 255, 255, 0.6),
                      inset 0 0 60px rgba(0, 255, 255, 0.5);
        }

        @keyframes vortex-spin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.2); }
        }

        @keyframes vortex-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
