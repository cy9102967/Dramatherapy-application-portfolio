import React, { useEffect, useState } from 'react';

interface FlashlightOverlayProps {
  x: number;
  y: number;
  isHovering?: boolean;
}

const FlashlightOverlay: React.FC<FlashlightOverlayProps> = ({ x, y, isHovering = false }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [radius, setRadius] = useState(350);

  // Target radius: 250px normally, 375px (1.5x) when hovering
  const targetRadius = isHovering ? 500 : 350;

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Animation loop for smooth radius transition
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      setRadius(prev => {
        const diff = targetRadius - prev;
        // If difference is small, snap to target
        if (Math.abs(diff) < 0.5) return targetRadius;
        // Ease factor 0.1 for natural smoothing
        return prev + diff * 0.1;
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetRadius]);

  const gradientStyle: React.CSSProperties = {
    background: `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 10%, rgba(5, 5, 5, 0.85) 50%, rgba(5, 5, 5, 0.92) 100%)`,
  };

  if (isTouchDevice) {
    // On mobile, just provide a vignette
    return (
      <div
        className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, transparent 30%, rgba(5, 5, 5, 0.85) 100%)`
        }}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none will-change-[background]"
      style={gradientStyle}
    />
  );
};

export default FlashlightOverlay;