import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'none';
  distance?: number;
  className?: string;
}

/**
 * Reusable scroll-triggered reveal animation component.
 * Features:
 * - Directional entrance: left-side slides in from left, right-side from right
 * - Triggers once when scrolled into view (no repetitive disappearing on scroll)
 * - Configurable delay for staggered groups
 * - Full respect for prefers-reduced-motion accessibility
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0.15,
  duration = 0.65,
  direction = 'up',
  distance = 32,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialVariant = {
    opacity: 0,
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
    y: direction === 'up' ? distance : 0,
  };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // snappy professional cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
