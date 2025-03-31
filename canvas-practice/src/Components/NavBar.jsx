import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between bg-[#632379] text-white w-full h-15 z-50 fixed top-0 left-0'>
      <div className='text-2xl m-4'>LowCode NoCode</div>
      <div className='px-4 pt-2'>
        <ul className='flex items-center justify-center gap-4 list-none'>
          <li tabIndex={0} className='cursor-pointer select-none hover:text-black'>
            <Link to="/home" className="no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none" style={{ textDecoration: "none" }}>Home</Link>
          </li>
          <li tabIndex={0} className='cursor-pointer select-none'>
            <Link to="/works/all-projects" className='no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none' style={{ textDecoration: "none" }}>Work</Link>
          </li>
          
          <li tabIndex={0} className='cursor-pointer select-none'>
            <Link to="/about" className='no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none' style={{ textDecoration: "none" }}>About Us</Link>
          </li>
          <li tabIndex={0} className='cursor-pointer select-none'>
            <Link to="/admin" className='no-underline text-white hover:border-b-2 border-white focus:border-b-2 focus:border-white focus:outline-none' style={{ textDecoration: "none" }}>Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar