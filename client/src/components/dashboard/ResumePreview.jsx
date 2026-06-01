import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ZoomInIcon, ZoomOutIcon, MaximizeIcon, SmartphoneIcon, MonitorIcon } from 'lucide-react';
import ClassicTemplate from '../templates/ClassicalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import MinimalImageTemplate from '../templates/MinimalImageTemplate';

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  // 1. Auto-Responsive Logic: Fits the A4 to the screen width
  const handleAutoResize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const a4WidthInPx = 794; // Approx 210mm at 96 DPI
      const padding = 40; // Space around the resume
      const newScale = (containerWidth - padding) / a4WidthInPx;
      
      // Don't scale up past 100% on huge monitors, only scale down for small screens
      setScale(newScale > 1 ? 1 : newScale);
    }
  };

  useEffect(() => {
    handleAutoResize();
    window.addEventListener('resize', handleAutoResize);
    return () => window.removeEventListener('resize', handleAutoResize);
  }, []);

  const templates = {
    "modern": ModernTemplate,
    "classictemplate": ClassicTemplate,
    "minimal": MinimalTemplate,
    "minimal-image": MinimalImageTemplate,
  };

  const SelectedTemplate = templates[template];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col items-center bg-slate-100 min-h-screen overflow-x-hidden p-4 sm:p-8 ${classes}`}
    >
      {/* Responsive Indicator - Helpful for UX */}
      <div className="mb-6 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 no-print">
        {scale < 1 ? (
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
            <SmartphoneIcon className="size-4" /> 
            <span>Auto-Scaled to {Math.round(scale * 100)}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
            <MonitorIcon className="size-4" /> 
            <span>Desktop View (100%)</span>
          </div>
        )}
        <button 
          onClick={handleAutoResize}
          className="ml-2 p-1 hover:bg-slate-100 rounded transition"
          title="Reset View"
        >
          <MaximizeIcon className="size-4 text-slate-400" />
        </button>
      </div>

      {/* The Scaling Container */}
      <div 
        className="relative transition-transform duration-500 ease-in-out print:transform-none"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '210mm',
          // We must set a height based on the scaled A4 to prevent large empty spaces below
          height: `${297 * scale}mm` 
        }}
      >
        <div 
          id="resume-preview" 
          className="bg-white shadow-2xl print:shadow-none"
          style={{ width: '210mm', minHeight: '297mm' }}
        >
          {SelectedTemplate ? (
            <SelectedTemplate data={data} accentColor={accentColor} />
          ) : (
            <div className="p-20 text-center text-slate-300">Select a template</div>
          )}
        </div>
      </div>

      {/* CSS Overrides */}
      <style>{`
        /* Hide scrollbars but keep functionality */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        @media print {
          /* Standardize print to A4 exactly */
          @page { size: A4; margin: 0; }
          
          body { margin: 0; background: white; }

          /* Ensure every element is ignored except our target */
          body > *:not(.print-container) { display: none !important; }
          
          #resume-preview {
            transform: none !important;
            width: 210mm !important;
            height: 297mm !important;
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        /* Prevent layout shift on mobile */
        html, body {
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;