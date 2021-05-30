import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

import { TiUser } from 'react-icons/ti';
import { RiHome2Fill } from 'react-icons/ri';
import { IoBag } from 'react-icons/io5';
import { ImHeart } from 'react-icons/im';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { setModalTrue } from '../../global/actions/modalActions';
import { setUserData, setUserIdFromFirebase } from '../../global/actions/userActions';
import { logoutUser } from '../../helpers/auth';

const MobileMenu = ({ userId, userData, setModalTrue, setUserData, setUserIdFromFirebase }) => {

  const iconStyles = 'text-2xl cursor-pointer';

  const [showMenu, setShowMenu] = useState(false);
  const [pathName, setPathName] = useState('');
  const [bagLength, setBagLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  useEffect(async () => {
    setPathName(window.location.pathname);
  }, []);

  useEffect(() => {
    const { bag, wishlist } = userData;
    setBagLength(bag.length);
    setWishlistLength(wishlist.length);
  }, [userData]);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response) {
      setUserIdFromFirebase('');
      setUserData({
        address: [],
        email: '',
        createdAt: 0,
        id: '',
        name: '',
        bag: [],
        wishlist: [],
        orderHistory: []
      });
    }
  }

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
          <Link href='/'><div><RiHome2Fill className={`${iconStyles} ${pathName === '/' ? 'text-purple-800 text-4xl' : 'text-black'}`} /></div></Link>
          <div className='relative'>
            <IoBag className={`${iconStyles}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>{bagLength}</span>
          </div>
          <div className='relative'>
            <ImHeart className={`${iconStyles}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>{wishlistLength}</span>
          </div>
          <TiUser className={`${iconStyles} text-4xl`}
          />
        </div>

        {
          !userId ?
            <div onClick={() => { setShowMenu(false); setModalTrue(); }} className='my-14 tracking-widest font-thin px-4 py-2 rounded shadow-md cursor-pointer border border-green-400 text-green-700'>
              LOGIN
            </div>
            :
            <div onClick={() => handleLogout()} className='my-14 tracking-widest font-thin px-4 py-2 rounded shadow-md cursor-pointer border border-red-400 text-red-700'>
              LOGOUT
            </div>
        }
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.UserReducer.userId,
    userData: state.UserReducer.userData
  }
}

const mapDispatchToProps = {
  setModalTrue: () => setModalTrue(),
  setUserIdFromFirebase: (args) => setUserIdFromFirebase(args),
  setUserData: (args) => setUserData(args)
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)
