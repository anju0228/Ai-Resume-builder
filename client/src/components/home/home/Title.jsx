import React from 'react'

const Title = ({title, description}) => {
  return (
    <div className='text-center mt-6 text-slate-700 text-2xl font-bold justify-center'>
        <h2 className='text-2xl sm:text-4xl font-medium'>{title}</h2>
        
        <p className=' max-w-7xl mx-auto px-4 text-center mt-7 text-slate-500 '>{description}</p>
    </div>
  )
}

export default Title