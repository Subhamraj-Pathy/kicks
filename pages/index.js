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
        <div className='px-16 bg-gray-200 min-h-screen'>
          <div className='float-right hidden lg:flex py-10'>
            <Image
              src='/images/Brand-min.png'
              width={150}
              height={60}
            />
          </div>

          {/* REST CONTENT GOES BELOW */}
        </div>
      </div>
    </div>
  )
}

export default Home
