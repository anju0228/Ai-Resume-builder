import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ( {selectedColor, onColorChange}) => {
    const colors = [
        { name: "Indigo", value: "#4F46E5" },
        { name: "Emerald", value: "#10B981" },
        { name: "Amber", value: "#F59E0B" },
        { name: "Rose", value: "#EC4899" },
        { name: "Sky", value: "#0EA5E9" },
        { name: "Violet", value: "#8B5CF6" },
        { name: "Slate", value: "#64748B" },
        { name: "Red", value: "#EF4444" },
    ];


    const[isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
        <button onClick={(()=> setIsOpen(!isOpen))} className='flex items-center gap-1 text-sm text-purple-600 bg-linear-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring-purple-400 px-3 py-1 rounded-lg font-bold transition-all'>
            <Palette size={16} />
            <span className='max-sm:hidden'>Accent</span>
        </button>
        {isOpen && (
            <div className='absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg p-3 flex flex-wrap gap-2 animate-in fade-in zoom-in duration-200 z-50'>
                {colors.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => {
                            onColorChange(color.value);
                            setIsOpen(false);
                        }}
                        className='w-8 h-8 rounded-full border border-slate-300 hover:scale-110 transition-transform'
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                    />
                ))}
            </div>
        )}
            {selectedColor === colors.value && (
                <div className='absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg p-3 flex flex-wrap gap-2 animate-in fade-in zoom-in duration-200 z-50'>
                    <span className='text-sm font-bold text-slate-700'>Selected Color</span>
                    <Check className='size-4 text-green-500' />
                </div>
            )}
            <p className='text-xs text-slate-500 mt-1'>Choose an accent color for your resume {colors.name}</p>
        
    </div>
  )
}

export default ColorPicker