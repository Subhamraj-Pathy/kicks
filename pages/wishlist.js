import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { connect } from 'react-redux';

import Nav from '../components/Navbar';
import Card from '../components/Card/card';
import { getKicksByIds } from '../helpers/kicks';
import { setModalTrue } from '../global/actions/modalActions';
import { isEmpty } from 'lodash';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/button';

const Wishlist = ({ userId, userData, setModalTrue }) => {

  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (userId) {
      const { wishlist } = userData;
      if (!isEmpty(wishlist)) {
        const wishlistedKicks = await getKicksByIds(wishlist);
        setWishlistData(wishlistedKicks);
      }
      setLoading(false);
    } else {
      setModalTrue();
    }
  }, [userId, userData]);

  return (
    <div className='flex justify-center bg-gray-100'>
      <Head>
        <title>Nike | Wishlist</title>
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

          {
            loading ?
              <div className='mt-20'><Loader /></div>
              :
              (
                !isEmpty(wishlistData) ?
                  <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3'>
                    {
                      wishlistData?.map((el, i) => (
                        <Card key={i} Item={el} />
                      ))
                    }
                  </div>
                  :
                  (
                    <Fragment>
                      <div className='mt-10 text-center tracking-widest font-extralight text-lg'>No Items in the wishlist</div>
                      <Link href='/kicks'>
                        <div className='mt-4 flex items-center justify-center'>
                          <Button
                            btnText={'CONTINUE SHOPPING'}
                          />
                        </div>
                      </Link>
                    </Fragment>
                  )
              )
          }

        </div>
      </div>
    </div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
