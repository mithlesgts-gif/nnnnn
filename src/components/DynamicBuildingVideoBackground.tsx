import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, Pause, Video, Eye, ShieldCheck } from 'lucide-react';

export interface BuildingVideoOption {
  id: string;
  label: string;
  src: string;
  poster: string;
  tag: string;
  discipline: string;
}

export const buildingVideoOptions: BuildingVideoOption[] = [
  {
    id: 'structural-rise',
    label: 'High-Rise Superstructure',
    src: '/videos/sim_2_structural_rise.mp4',
    poster: '/videos/sim_2_structural_rise_poster.jpg',
    tag: 'LOD 400 Framing',
    discipline: 'Structural Frame'
  },
  {
    id: 'curtain-wall',
    label: 'Curtain Wall Facade',
    src: '/videos/sim_4_curtain_wall.mp4',
    poster: '/videos/sim_4_curtain_wall_poster.jpg',
    tag: 'Architectural Glazing',
    discipline: 'Building Envelope'
  },
  {
    id: 'crane-logistics',
    label: 'Tower Crane Logistics',
    src: '/videos/sim_3_crane_logistics.mp4',
    poster: '/videos/sim_3_crane_logistics_poster.jpg',
    tag: 'Site Coordination',
    discipline: 'Construction Logistics'
  },
  {
    id: 'mep-services',
    label: 'Coordinated MEP Services',
    src: '/videos/sim_5_mep_services.mp4',
    poster: '/videos/sim_5_mep_services_poster.jpg',
    tag: 'LOD 350 MEPF',
    discipline: 'Building Services'
  },
  {
    id: 'excavation',
    label: 'Deep Foundation & Earthwork',
    src: '/videos/sim_1_excavation.mp4',
    poster: '/videos/sim_1_excavation_poster.jpg',
    tag: 'Substructure & Piling',
    discipline: 'Civil & Geotechnical'
  },
  {
    id: 'interior-turnkey',
    label: 'Turnkey Interior Architecture',
    src: '/videos/sim_6_interior_turnkey.mp4',
    poster: '/videos/sim_6_interior_turnkey_poster.jpg',
    tag: 'LOD 350 Architectural Fit-out',
    discipline: 'Interior & Finishes'
  }
];

interface DynamicBuildingVideoBackgroundProps {
  initialVideoId?: string;
  overlayTheme?: 'cool-blue' | 'navy-dark' | 'light-slate';
  opacity?: number;
  showControls?: boolean;
  className?: string;
}

export const DynamicBuildingVideoBackground: React.FC<DynamicBuildingVideoBackgroundProps> = ({
  initialVideoId = 'structural-rise',
  overlayTheme = 'cool-blue',
  opacity = 0.55,
  showControls = true,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedVideo, setSelectedVideo] = useState<BuildingVideoOption>(() => {
    return buildingVideoOptions.find(v => v.id === initialVideoId) || buildingVideoOptions[0];
  });
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Browser autoplay restriction fallback
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, selectedVideo]);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const getOverlayGradient = () => {
    switch (overlayTheme) {
      case 'navy-dark':
        return 'bg-gradient-to-b from-[#081024]/85 via-[#0B1530]/75 to-[#081024]/88';
      case 'light-slate':
        return 'bg-gradient-to-b from-[#E2ECF7]/85 via-[#EDF3FA]/70 to-[#E2ECF7]/88';
      case 'cool-blue':
      default:
        return 'bg-gradient-to-b from-[#E2EDF7]/85 via-[#EDF3FA]/68 to-[#DFEAF5]/85';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* 1. HTML5 Looping Background Video (Increased Visibility by 20%) */}
      <video
        ref={videoRef}
        key={selectedVideo.src}
        src={selectedVideo.src}
        poster={selectedVideo.poster}
        autoPlay={!shouldReduceMotion}
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-center filter contrast-115 saturate-[1.05]"
        style={{ opacity: shouldReduceMotion ? 0.25 : opacity }}
      />

      {/* 2. Measured Architectural Cool-Blue / Navy Tint Overlay Scrim */}
      <div className={`absolute inset-0 ${getOverlayGradient()} pointer-events-none`} />

      {/* 3. Subtle Radial Spotlight Scrim */}
      <div className="absolute inset-0 bg-radial-light opacity-40 pointer-events-none" />

      {/* 5. Interactive Background Video Selector Dock (When Enabled) */}
      {showControls && (
        <div className="hidden sm:flex absolute bottom-5 left-6 z-20 pointer-events-auto items-center gap-2 p-1.5 rounded-2xl bg-[#0B1530]/90 backdrop-blur-md border border-blue-500/40 shadow-xl text-white">
          <div className="flex items-center gap-2 px-2.5 py-1 border-r border-blue-900/60 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-blue-400' : 'bg-slate-500'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-[#2878FF]' : 'bg-slate-400'}`} />
            </span>
            <span className="font-bold text-blue-200">DYNAMIC BIM VIDEO:</span>
            <span className="text-white font-medium">{selectedVideo.tag}</span>
          </div>

          {/* Quick Scene Buttons */}
          <div className="flex items-center gap-1 px-1">
            {buildingVideoOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedVideo(opt)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  selectedVideo.id === opt.id
                    ? 'bg-[#165DFF] text-white shadow-xs'
                    : 'bg-blue-950/80 text-blue-300 hover:bg-blue-900 hover:text-white'
                }`}
                title={`Switch background video to ${opt.label}`}
              >
                {opt.label.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/60 transition-colors cursor-pointer border-l border-blue-900/60 pl-1.5"
            title={isPlaying ? 'Pause Dynamic Video' : 'Play Dynamic Video'}
            aria-label={isPlaying ? 'Pause Dynamic Video' : 'Play Dynamic Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      )}
    </div>
  );
};
