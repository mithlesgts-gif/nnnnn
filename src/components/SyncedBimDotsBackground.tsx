import React, { useEffect, useRef } from 'react';

interface SyncedBimDotsBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

interface NodePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isAnchor: boolean;
  tag?: string;
  phase: number;
  freq: number;
  ampX: number;
  ampY: number;
}

export const SyncedBimDotsBackground: React.FC<SyncedBimDotsBackgroundProps> = ({
  className = '',
  density = 'medium',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; active: boolean }>({
    x: null,
    y: null,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const count = density === 'high' ? 48 : density === 'low' ? 24 : 36;
    const maxDistance = 145; // line connection threshold
    let nodes: NodePoint[] = [];

    // Technical tags for architectural BIM point cloud feel (White & Blue only)
    const tags = ['LOD 350', 'COORD-X', '0-CLASH', 'ISO 19650', 'AXIS A', 'MEP-OK', 'GRID 04', 'ELEV +14m'];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize synchronized nodes distributed across a clean grid
      const cols = Math.ceil(Math.sqrt(count * (width / Math.max(height, 1))));
      const rows = Math.ceil(count / cols);
      const cellW = width / cols;
      const cellH = height / rows;

      nodes = [];
      let idx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (nodes.length >= count) break;

          const originX = c * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
          const originY = r * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4;

          const isAnchor = idx % 4 === 0;
          const isSkyBlue = idx % 3 === 0;
          // Only pure blue tones: vibrant engineering blue and bright sky blue
          const color = isAnchor ? '#1D4ED8' : isSkyBlue ? '#0284C7' : '#2563EB';

          nodes.push({
            x: originX,
            y: originY,
            originX,
            originY,
            vx: 0,
            vy: 0,
            radius: isAnchor ? 3.5 : 2.4,
            color,
            isAnchor,
            tag: isAnchor && idx % 3 === 0 ? tags[idx % tags.length] : undefined,
            phase: (idx / count) * Math.PI * 2, // synchronized harmonic phase
            freq: 0.0012 + (idx % 3) * 0.0004,
            ampX: 18 + (idx % 4) * 8,
            ampY: 14 + (idx % 3) * 6,
          });

          idx++;
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for subtle interactive magnetism
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);

      // 1. Update node positions with synchronized harmonic sinusoidal movement
      const globalPulse = (Math.sin(elapsed * 0.002) + 1) * 0.5; // 0 to 1 synchronized breath

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Synchronized wave calculation
        const syncOffsetX = Math.sin(elapsed * node.freq + node.phase) * node.ampX;
        const syncOffsetY = Math.cos(elapsed * node.freq + node.phase * 0.8) * node.ampY;

        let targetX = node.originX + syncOffsetX;
        let targetY = node.originY + syncOffsetY;

        // Interactive mouse repulsion/attraction if mouse is active
        if (mouseRef.current.active && mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - targetX;
          const dy = mouseRef.current.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseRadius = 160;

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 22;
            targetX += (dx / dist) * force * 0.6;
            targetY += (dy / dist) * force * 0.6;
          }
        }

        node.x = targetX;
        node.y = targetY;
      }

      // 2. Draw Synchronized Interconnecting Mesh Lines (Pure White & Blue)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = dist < maxDistance * 0.5 ? 1.0 : 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Connect to Mouse if in range
      if (mouseRef.current.active && mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.4;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Synchronized Moving Dots & Pulses (Blue & White Only)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Draw outer synchronized pulse halo on anchor nodes
        if (node.isAnchor) {
          const pulseRadius = node.radius + globalPulse * 8;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - globalPulse) * 0.45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.isAnchor ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw technical tag annotation if present
        if (node.tag) {
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(37, 99, 235, 0.8)';
          ctx.fillText(node.tag, node.x + 8, node.y - 6);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
