import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';

export type ProximityPhysicsMode = 'repel' | 'attract';

export interface ProximityWordProps {
  children: React.ReactNode;
  className?: string;
  proximityRadius?: number;
  maxDisplacement?: number;
  highlightOnNear?: boolean;
  mode?: ProximityPhysicsMode;
  showCoordinatesOnHover?: boolean;
  glowOnNear?: boolean;
}

/**
 * ProximityWord:
 * Words move dynamically when the mouse cursor is nearby!
 * Uses a stationary anchor ref to eliminate transform-feedback jitter,
 * coupled with tuned physics springs for responsive, silky-smooth motion.
 */
export const ProximityWord: React.FC<ProximityWordProps> = ({
  children,
  className = '',
  proximityRadius = 220,
  maxDisplacement = 42,
  highlightOnNear = true,
  mode = 'repel',
  showCoordinatesOnHover = false,
  glowOnNear = true
}) => {
  const shouldReduceMotion = useReducedMotion();
  // Stationary anchor ref that NEVER gets transformed, guaranteeing stable distance measurements
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [currentForce, setCurrentForce] = useState(0);

  // Tuned spring physics for instantaneous, organic responsiveness
  const springConfig = { damping: 18, stiffness: 220, mass: 0.12 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let rafId: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;

    const updatePhysics = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = lastClientX - centerX;
      const distY = lastClientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < proximityRadius) {
        setIsNear(true);
        // Normalized proximity curve: closer cursor -> stronger magnetic reaction
        const rawFactor = 1 - distance / proximityRadius;
        const force = Math.pow(rawFactor, 1.15); // gentle non-linear curve
        setCurrentForce(force);

        const angle = Math.atan2(distY, distX);
        const direction = mode === 'repel' ? -1 : 1;

        // Displace along vector
        const moveX = direction * Math.cos(angle) * force * maxDisplacement;
        const moveY = direction * Math.sin(angle) * force * maxDisplacement;
        // Natural tilt corresponding to cursor angle and offset
        const tilt = direction * (-distX / proximityRadius) * 14 * force;
        const scaleVal = mode === 'repel' ? 1 + force * 0.1 : 1 + force * 0.14;

        x.set(moveX);
        y.set(moveY);
        rotate.set(tilt);
        scale.set(scaleVal);
      } else {
        if (isNear) {
          setIsNear(false);
          setCurrentForce(0);
        }
        x.set(0);
        y.set(0);
        rotate.set(0);
        scale.set(1);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updatePhysics();
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', updatePhysics, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updatePhysics);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [proximityRadius, maxDisplacement, shouldReduceMotion, mode, isNear, x, y, rotate, scale]);

  return (
    <span
      ref={anchorRef}
      className="inline-block relative select-none align-baseline pointer-events-auto"
      style={{
        verticalAlign: 'baseline'
      }}
    >
      <motion.span
        style={{
          x,
          y,
          rotate,
          scale,
          display: 'inline-block',
          willChange: 'transform',
          transformOrigin: 'center center'
        }}
        className={`transition-colors duration-150 cursor-pointer ${
          isNear && highlightOnNear ? 'text-[#165DFF]' : ''
        } ${
          isNear && glowOnNear ? 'drop-shadow-[0_4px_16px_rgba(22,93,255,0.25)]' : ''
        } ${className}`}
      >
        {children}

        {/* Optional micro coordinate HUD on close cursor proximity */}
        {showCoordinatesOnHover && isNear && currentForce > 0.4 && (
          <span 
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#0B1530] text-blue-200 border border-blue-400/40 pointer-events-none shadow-md z-30 whitespace-nowrap animate-fade-in"
          >
            Δ {(currentForce * 100).toFixed(0)}%
          </span>
        )}
      </motion.span>
    </span>
  );
};

export interface ProximitySentenceProps {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string;
  proximityRadius?: number;
  maxDisplacement?: number;
  mode?: ProximityPhysicsMode;
  highlightOnNear?: boolean;
}

/**
 * ProximitySentence:
 * Automatically parses a sentence or phrase into interactive proximity words,
 * maintaining perfect typographic spacing and natural inline flow.
 */
export const ProximitySentence: React.FC<ProximitySentenceProps> = ({
  text,
  className = '',
  wordClassName,
  proximityRadius = 200,
  maxDisplacement = 36,
  mode = 'repel',
  highlightOnNear = true
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, idx) => {
        const extraClass = wordClassName ? wordClassName(word, idx) : '';
        return (
          <React.Fragment key={`${word}-${idx}`}>
            <ProximityWord
              proximityRadius={proximityRadius}
              maxDisplacement={maxDisplacement}
              mode={mode}
              highlightOnNear={highlightOnNear}
              className={extraClass}
            >
              {word}
            </ProximityWord>
            {idx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </React.Fragment>
        );
      })}
    </span>
  );
};
