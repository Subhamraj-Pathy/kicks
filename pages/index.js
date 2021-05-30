import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Navbar';
import { getNewAdditions } from '../helpers/kicks';
import Card from '../components/Card/card';

const Home = () => {

  const [newAdditions, setNewAdditions] = useState([]);

  useEffect(async () => {
    const newAdditions = await getNewAdditions();
    setNewAdditions(newAdditions);
  }, []);

  return (
    <div className='flex justify-center bg-gray-100'>
      <Head>
        <title>K I C K S</title>
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


          {/* HERO */}
          <div className='p-4 shadow-md mb-4 w-full h-auto space-y-6 flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-between bg-black text-white'>
            <div className='flex flex-col lg:flex-row'>
              <img
                loading='lazy'
                src='/images/Hero.jpg'
                alt='hero'
              />
              <div className='relative flex items-center justify-center font-bold text-8xl tracking-widest lg:transform lg:-rotate-90 lg:text-9xl lg:-m-40'>
                NIKE
              <div className='bg-black py-0.5 w-full absolute top-1/2 transform -translate-y-1/3 text-center font-thin text-2xl lg:text-3xl tracking-widest'>
                  JUST DO IT
              </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center lg:items-end'>
              <p className='text-center tracking-widest font-thin text-2xl inline lg:hidden'>Discover the latest collection</p>
              <p className='text-right tracking-widest font-thin text-4xl hidden lg:inline mb-6'>Discover the</p>
              <p className='text-right tracking-widest font-thin text-4xl hidden lg:inline'>latest collection</p>
              <Link href='/shop'><div className='mt-6 lg:mt-10 px-6 py-4 text-2xl tracking-widest bg-white text-black cursor-pointer'>Shop Now</div></Link>
            </div>
          </div>

          {/* NEW ARRIVALS */}
          <div className='text-center my-6 mt-14 tracking-widest font-light text-2xl lg:text-4xl'>
            NEW ARRIVALS
          </div>
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3'>
            {
              newAdditions?.map((el, i) => (
                <Card key={i} Item={el} />
              ))
            }
          </div>

          {/* BANNER */}
          <div className='shadow-md w-full h-80 flex justify-center' style={{ background: '#FF314D' }}>
            <img
              loading='lazy'
              src='/images/BannerImg.png'
              alt='banner'
            />
          </div>

          {/* BEST SELLER */}
          {/* BEST SELLERS IS DUPLICATED AS OF NOW */}
          <div className='text-center my-6 tracking-widest font-light text-2xl lg:text-4xl'>
            BEST SELLERS
          </div>
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3'>
            {
              newAdditions?.map((el, i) => (
                <Card key={i} Item={el} />
              ))
            }
          </div>

          {/* MID POSTER */}
          <div className='shadow-md w-full h-80 flex justify-center mb-4' style={{ background: '#C3C3C3' }}>
            <img
              loading='lazy'
              src='/images/mid.png'
              alt='banner'
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
