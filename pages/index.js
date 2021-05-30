import Head from 'next/head';
import Image from 'next/image';
import Nav from '../components/Navbar';

const Home = () => {
  return (
    <div className='flex justify-center'>
      <Head>
        <title>K I C K S</title>
        <meta name="description" content="A mock nike kicks online shopping app made for educational purpose" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='w-screen max-w-screen-2xl shadow min-h-screen'>
        <Nav />
        <div className='pt-16 pr-2 pl-2 lg:pt-6 lg:pr-8 lg:pl-36 bg-gray-200 min-h-screen'>
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

        </div>
      </div>
    </div>
  )
}

export default Home
