import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { TiUser } from 'react-icons/ti';
import { RiHome2Fill } from 'react-icons/ri';
import { IoBag } from 'react-icons/io5';
import { ImHeart } from 'react-icons/im';
import { RiLoginCircleLine } from 'react-icons/ri';
import { RiLogoutCircleLine } from 'react-icons/ri';

import { setModalTrue } from '../../global/actions/modalActions';
import { logoutUser } from '../../helpers/auth';
import { setUserData, setUserIdFromFirebase } from '../../global/actions/userActions';

const SideNav = ({ userId, userData, setModalTrue, setUserData, setUserIdFromFirebase }) => {

  const iconStyles = 'text-2xl cursor-pointer';

  const router = useRouter();

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
      router.push('/');
      setTimeout(() => {
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
      }, 300);
    }
  }

  return (
    <div className='bg-white w-28 h-screen shadow-md fixed flex flex-col items-center justify-between py-10'>

      <Image
        src='/images/logo-min.png'
        width={50}
        height={20}
      />

      <div className='space-y-8 flex flex-col items-center'>
        <Link href='/'><div><RiHome2Fill className={`${iconStyles} ${pathName === '/' ? 'text-purple-800 text-4xl' : 'text-black'}`} /></div></Link>
        <Link href='/bag'>
          <div className='relative'>
            <IoBag className={`${iconStyles} ${pathName === '/bag' ? 'text-purple-800 text-4xl' : 'text-black'}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>{bagLength}</span>
          </div></Link>
        <Link href='/wishlist'>
          <div className='relative'>
            <ImHeart className={`${iconStyles} ${pathName === '/wishlist' ? 'text-purple-800 text-4xl' : 'text-black'}`} />
            <span className='px-2 py-0.5 rounded-full bg-yellow-300 text-sm absolute -top-2 left-6'>{wishlistLength}</span>
          </div></Link>
        {userId && <TiUser className={`${iconStyles} text-4xl`} />}
      </div>

      { !userId ?
        <RiLoginCircleLine
          onClick={() => setModalTrue()}
          className={`${iconStyles} text-4xl text-green-600`}
        />
        :
        <RiLogoutCircleLine
          onClick={() => handleLogout()}
          className={`${iconStyles} text-4xl text-red-600`}
        />
      }

    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.UserReducer.userId,
    userData: state.UserReducer.userData,
  }
}

const mapDispatchToProps = {
  setModalTrue: () => setModalTrue(),
  setUserIdFromFirebase: (args) => setUserIdFromFirebase(args),
  setUserData: (args) => setUserData(args)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
