import { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Navbar';
import { setModalTrue } from '../global/actions/modalActions';
import { setUserData } from '../global/actions/userActions';
import { getUserById } from '../helpers/auth';
import Button from '../components/Button/button';

const OrderPlaced = ({ userId, setUserData, setModalTrue }) => {

  useEffect(async () => {
    if (userId) {
      const userData = await getUserById(userId);
      setUserData(userData);
    } else {
      setModalTrue();
    }
  }, [userId]);

  return (
    <div className='flex justify-center bg-gray-100'>
      <Head>
        <title>Nike | Order Placed</title>
        <meta name="description" content="A mock nike kicks online shopping app made for educational purpose" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='w-screen max-w-screen-2xl shadow min-h-screen'>
        <Nav />
        <div className='pt-16 pr-2 pl-2 lg:pt-6 lg:pr-8 lg:pl-36 min-h-screen'>
          <div className='hidden lg:flex items-center justify-end w-full py-4'>
            <Image
              src='/images/Brand-min.png'
              width={120}
              height={50}
            />
          </div>

          {/* REST CONTENT GOES BELOW */}
          {/* ----------------------- */}

          <div className='mb-4 text-center tracking-widest text-xl lg:text-2xl'>
            Your Order Has Been Placed Successfully
          </div>

          <div className='shadow-md w-full h-80 flex justify-center' style={{ background: '#B8B8B8' }}>
            <img
              loading='lazy'
              src='/images/l.jpg'
              alt='banner'
            />
          </div>

          <Link href='/myOrders'>
            <div className='flex justify-center mt-4'>
              <Button btnText='VIEW ORDERS' />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.UserReducer.userId,
  }
}

const mapDispatchToProps = {
  setUserData: (args) => setUserData(args),
  setModalTrue: () => setModalTrue(),
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlaced)
