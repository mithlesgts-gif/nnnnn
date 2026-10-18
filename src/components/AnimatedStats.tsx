import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, Layers, GitBranch, UserCheck, CheckCircle2, Sparkles, Box } from 'lucide-react';
import { SyncedBimDotsBackground } from './SyncedBimDotsBackground';

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  detail: string;
}

export const AnimatedStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const stats: StatItem[] = [
    {
      id: 'capabilities',
      targetValue: 12,
      suffix: '+',
      title: 'BIM Capabilities',
      subtitle: 'Multidisciplinary Coverage',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      detail: 'Architectural, Structural, MEP, Scan-to-BIM & 4D/5D'
    },
    {
      id: 'lod',
      targetValue: 500,
      suffix: '',
      prefix: 'LOD ',
      title: 'Level of Development',
      subtitle: 'Concept to Digital Twin',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      detail: 'From LOD 100 schematic massing up to LOD 500 As-Built'
    },
    {
      id: 'clash',
      targetValue: 100,
      suffix: '%',
      title: 'Zero Clash Goal',
      subtitle: 'Federated Clearance',
      icon: <GitBranch className="w-5 h-5 text-blue-600" />,
      detail: 'Hard & soft trade spatial coordination in Navisworks Manage'
    },
    {
      id: 'pm',
      targetValue: 1,
      suffix: ':1',
      title: 'Dedicated Lead',
      subtitle: 'Single Point of Contact',
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      detail: 'Every project is assigned an accountable Project Manager'
    }
  ];

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-b border-blue-200/80">
      {/* Blueprint Grid & Moving Dots */}
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <SyncedBimDotsBackground density="low" className="opacity-40" />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl p-6 border border-blue-200/90 hover:border-[#165DFF] transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Dynamic Accent Top Line (Blue Only) */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl border bg-[#DFEAF5] border-blue-200 text-blue-600">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-[#DFEAF5] px-2 py-0.5 rounded border border-blue-200 font-semibold">
                    {stat.subtitle}
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 flex items-baseline gap-0.5">
                    {stat.prefix && <span className="text-lg font-mono text-slate-500 mr-1">{stat.prefix}</span>}
                    <AnimatedCounter value={stat.targetValue} startAnimation={isInView} />
                    <span className="text-blue-600">{stat.suffix}</span>
                  </div>
                  <h3 className="text-sm font-bold font-display text-slate-800 mt-1">
                    {stat.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {stat.detail}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-blue-200/70 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-blue-600 transition-colors">
                <span>Verified Metric</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedCounter: React.FC<{ value: number; startAnimation: boolean }> = ({ value, startAnimation }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [value, startAnimation]);

  return <span>{displayValue}</span>;
};
