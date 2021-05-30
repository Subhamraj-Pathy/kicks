import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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

          {/* BANNER */}
          <div className='shadow-md w-full h-80 flex justify-center' style={{ background: '#FF314D' }}>
            <img
              loading='lazy'
              src='/images/BannerImg.png'
              alt='banner'
            />
          </div>

          <div className='text-center my-6 tracking-widest font-light text-2xl lg:text-4xl'>
            NEW ARRIVALS
          </div>
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3'>
            {
              newAdditions?.map((el, i) => (
                <Card key={i} Item={el} />
              ))
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
