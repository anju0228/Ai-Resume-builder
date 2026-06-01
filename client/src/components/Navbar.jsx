import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom' 
import { logout } from '../app/features/authSlice'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const {user } = useSelector(state=>state.auth)
    const dispatch = useDispatch()

   const navigate = useNavigate()   
    

    const logoutUser = () => {
        navigate('/login')
        dispatch(logout())
    }
  return (
    <div className='shadow bg-white '>
        <nav className='flex items-center justify-between max-w-7x1 mx-auto px-4 py-3.5 text-slate-800 transition-all st'>
           <Link to="/">
           <img className='h-8 w-auto' src="/logo.png" alt="Logo" />
            </Link >

            <div className='flex item-center gap-4 text-sm'>
                <p className='max-sm:hidden '>Hi, {user.name}</p>
                <button onClick={logoutUser} className='bg-blue-400 hover:bg-slate-50 border border-slate-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>    
            </div>
           </nav>
            
            </div>
  )
}

export default Navbar