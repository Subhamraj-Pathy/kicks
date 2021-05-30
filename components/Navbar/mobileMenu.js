import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { TiUser } from 'react-icons/ti';
import { RiHome2Fill } from 'react-icons/ri';
import { IoBag } from 'react-icons/io5';
import { ImHeart } from 'react-icons/im';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const MobileMenu = () => {

  const iconStyles = 'text-2xl cursor-pointer';

  const [showMenu, setShowMenu] = useState(false);
  const [pathName, setPathName] = useState('');

   useEffect(() => {
     setPathName(window.location.pathname);
   }, []);

  return (
    <Fragment>
      <div className='bg-white shadow-md w-full h-14 flex items-center justify-end pr-6 z-30 fixed'>
        {
          !showMenu ?
            <HiMenuAlt4 className='text-3xl cursor-pointer' onClick={() => setShowMenu(true)} />
            :
            <IoClose className='text-3xl cursor-pointer' onClick={() => setShowMenu(false)} />
        }
      </div>
      <div
        className={
          `bg-gray-100 w-full
          ${showMenu ? 'h-screen' : 'h-0'}
          fixed z-20 duration-75 overflow-hidden
          flex flex-col items-center pt-14 select-none`
        }
      >
        <div className='my-10'>
          <Image
            src='/images/logo-min.png'
            width={80}
            height={30}
          />
        </div>

        <div className='space-y-8 flex flex-col items-center'>
        <Link href='/'><div><RiHome2Fill className={`${iconStyles} ${pathName === '/' ? 'text-purple-800 text-4xl' : 'text-black' }`} /></div></Link>
          <div className='relative'>
            <IoBag className={`${iconStyles}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>0</span>
          </div>
          <div className='relative'>
            <ImHeart className={`${iconStyles}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>0</span>
          </div>
          <TiUser className={`${iconStyles} text-4xl`}
          />
        </div>

        <div className='my-14 tracking-widest font-thin px-4 py-2 rounded shadow-md cursor-pointer border border-green-400 text-green-700'>
          LOGIN
        </div>
      </div>
    </Fragment>
  )
}

export default MobileMenu
