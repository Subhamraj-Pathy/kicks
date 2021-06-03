import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { connect } from 'react-redux';
import { forEach, isEmpty } from 'lodash';
import { MdLocalShipping } from 'react-icons/md';
import Nav from '../components/Navbar';
import Button from '../components/Button/button';
import { setModalTrue } from '../global/actions/modalActions';
import { formatPrice } from '../helpers/formatCurrency';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const Bag = ({ userId, userData, setModalTrue }) => {

  const [bagItems, setBagItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    if (!userId) {
      setModalTrue();
    } else {
      const { bag } = userData;
      let total = 0;
      forEach(bag, (i) => {
        total = total + i.price;
      });
      setTotal(total);
      setBagItems(bag);
    }
  }, [userId, userData]);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/createCheckoutSession', {
      userId,
      email: userData.email,
      items: bagItems
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

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
          <div className='mt-10 text-center tracking-widest font-extralight text-3xl'>Shopping Bag</div>
          {
            isEmpty(bagItems) ?
              (
                <Fragment>
                  <div className='mt-10 text-center tracking-widest font-extralight text-lg'>No Items in the bag</div>
                  <Link href='/kicks'>
                    <div className='mt-4 flex items-center justify-center'>
                      <Button
                        btnText={'CONTINUE SHOPPING'}
                      />
                    </div>
                  </Link>
                </Fragment>
              )
              :
              (
                <div className='mt-6 flex flex-col-reverse lg:flex-row lg:justify-evenly lg:items-start'>
                  <div className='w-full lg:w-3/5 h-auto mt-4 lg:mt-0 border border-gray-200 shadow-md rounded-md' style={{ background: '#F7F7F7' }}>
                    {
                      bagItems?.map((el, i) => (
                        <div key={i} className='flex p-1 border-b-2'>
                          <div className='p-4'>
                            <Image
                              src={el.image}
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className='mt-4 ml-4'>
                            <Link href={`/kicks/${el.id}`}><p className='tracking-widest text-left text-lg cursor-pointer text-purple-900 hover:underline'>{el.name}</p></Link>
                            <p className='mt-2 font-bold tracking-widest text-lg'>&#8377;{formatPrice(el.price)}</p>
                            <p className='mt-1 tracking-widest'><span className='font-semibold'>Color: </span>{el.color}</p>
                            <p className='mt-1 tracking-widest'><span className='font-semibold'>Size: </span>{el.size}</p>
                            <p className='mt-1 mb-2 tracking-widest'><span className='font-semibold'>Quantity: </span>{el.quantity}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className='w-full lg:w-1/5 h-auto border border-gray-200 shadow-md rounded-md' style={{ background: '#F7F7F7' }}>
                    <p className='p-2 text-sm tracking-widest text-gray-500 flex items-center'><MdLocalShipping className='text-5xl mr-4 text-gray-900' /> Your order is eligible for FREE Shipping</p>
                    <p className='mt-2 text-left pl-2 lg:text-center lg:pl-0 tracking-widest text-lg'>Total ({bagItems.length} Items): <span className='font-bold'>&#8377;{formatPrice(total)}</span></p>
                    <div className='my-4 flex items-center justify-center'>
                      <Button
                        onClick={() => createCheckoutSession()}
                        btnText={'BUY'}
                        role='link'
                      />
                    </div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
