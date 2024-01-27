import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs';

const Backbutton = ({destination ='/'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-sky-800 px-8 text-white rounded-lg w-fit'>
             <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default Backbutton