import { useState, useEffect } from "react";
import "./Snail.css";

interface SnailProps {
  /** Initial speed: 'slow' or 'fast' */
  initialSpeed?: "slow" | "fast";
}

export default function Snail({ initialSpeed = "slow" }: SnailProps) {
  const [speed, setSpeed] = useState<"slow" | "fast">(initialSpeed);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleSpeed = () => {
    setSpeed((prev) => (prev === "slow" ? "fast" : "slow"));
  };

  return (
    <div
      className={`snail-container ${prefersReducedMotion ? "reduced-motion" : ""}`}
      role="img"
      aria-label="Animated snail mascot"
    >
      <svg
        className={`snail-svg speed-${speed}`}
        width="120"
        height="80"
        viewBox="0 0 120 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Snail shell */}
        <circle
          cx="70"
          cy="40"
          r="25"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="2"
        />
        <circle
          cx="70"
          cy="40"
          r="18"
          fill="#A0522D"
          stroke="#654321"
          strokeWidth="1"
        />
        {/* Shell spiral */}
        <path
          d="M 70 30 Q 75 35, 70 40 Q 65 40, 65 35 Q 68 30, 70 30"
          fill="none"
          stroke="#654321"
          strokeWidth="1.5"
        />

        {/* Snail body */}
        <ellipse
          cx="45"
          cy="55"
          rx="30"
          ry="15"
          fill="#D2B48C"
          stroke="#B8986A"
          strokeWidth="2"
        />
        {/* Body texture */}
        <ellipse
          cx="45"
          cy="55"
          rx="25"
          ry="12"
          fill="none"
          stroke="#C4A576"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Snail head */}
        <circle cx="25" cy="50" r="12" fill="#D2B48C" stroke="#B8986A" strokeWidth="2" />

        {/* Left antenna */}
        <line
          x1="20"
          y1="45"
          x2="15"
          y2="35"
          stroke="#B8986A"
          strokeWidth="2"
          strokeLinecap="round"
          className="antenna-left"
        />
        <circle cx="15" cy="35" r="2.5" fill="#8B7355" />

        {/* Right antenna */}
        <line
          x1="30"
          y1="45"
          x2="35"
          y2="35"
          stroke="#B8986A"
          strokeWidth="2"
          strokeLinecap="round"
          className="antenna-right"
        />
        <circle cx="35" cy="35" r="2.5" fill="#8B7355" />

        {/* Snail face */}
        <circle cx="22" cy="48" r="2" fill="#654321" />
        <circle cx="28" cy="48" r="2" fill="#654321" />
        <path
          d="M 22 53 Q 25 54, 28 53"
          fill="none"
          stroke="#654321"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {!prefersReducedMotion && (
        <div className="speed-controls" role="group" aria-label="Animation speed controls">
          <button
            onClick={toggleSpeed}
            className={`speed-btn ${speed === "slow" ? "active" : ""}`}
            aria-pressed={speed === "slow"}
          >
            Slow
          </button>
          <button
            onClick={toggleSpeed}
            className={`speed-btn ${speed === "fast" ? "active" : ""}`}
            aria-pressed={speed === "fast"}
          >
            Fast
          </button>
        </div>
      )}

      {prefersReducedMotion && (
        <p className="reduced-motion-notice" role="status">
          Animation paused (respecting reduced motion preference)
        </p>
      )}
    </div>
  );
}
