import { Check, ChevronDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Note: renamed prop to 'onChange' to match your ResumeBuilder usage
const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const templates = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "minimal", name: "Minimal" },
    { id: "minimal-image", name: "Minimal Image" },
  ]

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <div className='relative inline-block'>
      
      {/* Button: Added Chevron and better styling */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(prev => !prev)
        }}
        className='flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm'
      >
        <span>Template: <span className="text-indigo-600 capitalize">{selectedTemplate}</span></span>
        <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className='absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl  overflow-hidden animate-in fade-in zoom-in duration-200'
        >
          <div className="p-2 border-b border-slate-50 bg-slate-50/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Select Design</p>
          </div>
          
          <div className="py-1">
            {templates.map((template) => {
              const isSelected = selectedTemplate === template.id

              return (
                <div
                  key={template.id}
                  onClick={() => {
                    // 🔥 Matches the prop name used in ResumeBuilder
                    onChange(template.id) 
                    setIsOpen(false)
                  }}
                  className={`flex items-center justify-between cursor-pointer px-4 py-3 transition-colors ${
                    isSelected ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className='font-semibold text-sm'>
                    {template.name}
                  </span>

                  {isSelected && (
                    <Check className='size-4 text-indigo-600' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector