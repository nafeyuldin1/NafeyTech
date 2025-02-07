import { Navlinks } from '@/data'
import { BodyFont, HeadingFont } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex fixed    header items-center justify-between   w-[90%]   md:max-w-full '>
       <div className='logo'>
         <Image className='h-[40px] md:h-[55px] w-auto' src='/NafeyTechLogo.png' alt='NafeyTech'  width={200} height={200} />
       </div>

       <div className='menubar w-auto hidden md:flex gap-6 text-black'>
         {
          Navlinks.map((item, index) => (
            <Link key={index} className={`${BodyFont} text-white uppercase text-xl tracking-[0.1rem]
`} href={item.link}>
               {item.label}
            </Link>
          ))
         }
       </div>

       <div className={`${BodyFont} md:flex hidden uppercase text-xl tracking-[0.1rem] text-white `}>
       <button className={`letstalkbutton  uppercase ${HeadingFont}`}>
         Let&#39;s Talk
  <svg fill="currentColor" viewBox="0 0 24 24" className="letstalkbuttonicon">
    <path
      clip-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
      fill-rule="evenodd"
    ></path>
  </svg>
</button>
       </div>
    </div>
  )
}

export default Header
