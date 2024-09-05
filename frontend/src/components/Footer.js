import React from 'react'
import creator from '../assets/image/builtIn/creator.png'
export default function Footer() {
  return (
    <div>
        <div className='flex justify-center items-center p-1 gap-4 bg-gray-200 navbar dark:bg-gray-900 dark:text-white'>
            <img className='w-6 rounded-full' src={creator} alt="" srcset="" />
            <b>Xlorex Bishal</b>
        </div>
    </div>
  )
}
