import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import React from 'react'

const PersonalInfoForm = ({
  data = {},
  onChange,
  removeBackground,
  setRemoveBackground
}) => {
  
  const handleChange =(field, value)=>{
    onChange({...data,[field]:value})
  }

  const fields = [ 
    {label:"Full Name", name:"full_name", icons:User, type:"text", required:true},
    {label:"Job Title", name:"job_title", icons:Briefcase, type:"text", required:true},
    {label:"Email", name:"email", icons:Mail, type:"email"},
    {label:"Phone", name:"phone", icons:Phone, type:"tel"},
    {label:"Address", name:"address", icons:MapPin, type:"text" },
    {label:"profession", name:"profession", icons:User, type:"text" },
    {label:"LinkedIn", name:"linkedin", icons:User, type:"url" },
    {label:"GitHub", name:"github", icons:User, type:"url" },
  ]
  
  return (
    <div>
        <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
        <p className='text-sm text-gray-600'> Get Started with the personal information</p>
        <label htmlFor="image-upload"> {data?.image ? (
            <img src={typeof data.image === 'string'? data.image :URL.createObjectURL( data.image)} alt="user-image" className=' w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'/>
        ):(
            <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
              <User className="size-10 p-2.5 border rounded-full"/>
              Upolad user image
            </div>
        )}

        <input type="file"  accept="image/jpeg, image/png" className='hidden' onChange={(e)=> handleChange('image',e.target.files?.[0])}/>
            </label>
            {typeof data.image=== 'object' &&(
              <div className='flex flex-col gap-1 pl-4 text-sm'>
                <p>Remove Background</p>
                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                  <input type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground}/>

                  <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                  <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                </label>
              </div>
            )}


            
   {fields.map((field) => {
  const Icon = field.icons;
  return (
    <div key={field.name} className='flex items-center gap-3'>
      <label className='text-sm text-gray-700 w-32 flex items-center gap-1'>
        <Icon className='size-4 text-gray-500'/>
        {field.label}
        {field.required && <span className='text-red-500'>*</span>}
      </label>

      <input
        type={field.type}
        value={data?.[field.name] || ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className='w-full border border-gray-300 rounded-md px-3 py-2 m-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder={`Enter your ${field.label.toLowerCase()}`}
        required={field.required}
      />
    </div>
  );
})}
    </div>
)
}

export default PersonalInfoForm