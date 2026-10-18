import React, { useState } from 'react';
import { bimProcessGalleryItems, BimProcessGalleryItem } from '../../data/bimInMotionData';
import { Layers, CheckCircle2, ZoomIn, ArrowRight, X, Info } from 'lucide-react';

export const BimProcessGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<BimProcessGalleryItem | null>(null);

  const filters = ['All', 'Architecture', 'Structure', 'MEP', 'Coordination', 'Fabrication', 'Reality Capture'];

  const filteredItems = activeFilter === 'All' 
    ? bimProcessGalleryItems 
    : bimProcessGalleryItems.filter(item => item.discipline === activeFilter);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 uppercase tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Module 01 · Process Gallery
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
            Multidisciplinary BIM Production &amp; Coordination
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            From initial parametric modeling across disciplines to federated clash resolution and reality capture digital twins.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap p-1.5 bg-slate-100 border border-slate-200 rounded-xl">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl border border-blue-200/90 hover:border-blue-500 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col"
          >
            {/* Image Thumbnail with Overlay */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Clean inline metadata */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono text-white bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">
                <span>{item.discipline}</span>
                <span className="text-blue-400">·</span>
                <span className="text-blue-300 font-semibold">{item.stage}</span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.technicalDescription}
                </p>
              </div>

              {/* Feature Points */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                {item.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:text-blue-700">
                <span>Inspect Technical Spec</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Deep Inspection */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-[#EAF1F8] border border-blue-200/90 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-[#D2E2F0] hover:bg-[#C5D8EA] border border-blue-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
                <span>{selectedItem.discipline}</span>
                <span className="text-slate-300">·</span>
                <span>{selectedItem.stage}</span>
                <span className="text-slate-300">·</span>
                <span>{selectedItem.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {selectedItem.title}
              </h3>
            </div>

            <div className="relative h-60 rounded-xl overflow-hidden border border-blue-200 bg-slate-950">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-white border border-white/20">
                BIM Workflow Specification
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Technical Specification &amp; Scope
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-body">
                {selectedItem.technicalDescription}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                Model Verification Points
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedItem.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
