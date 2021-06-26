import { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Navbar';
import Button from '../components/Button/button';
import { setModalTrue } from '../global/actions/modalActions';
import { setUserData } from '../global/actions/userActions';
import { getOrderDetailsByOrderId } from '../helpers/kicks';
import { isEmpty } from 'lodash';
import { getDate } from '../helpers/getDateFromTimeStamp';
import { formatPrice } from '../helpers/formatCurrency';

const MyOrders = ({ userId, userData, setModalTrue }) => {

  const [orderDetails, setOrderDetails] = useState([])

  useEffect(async () => {
    if (userId) {
      const { orderHistory } = userData;
      const orderIds = orderHistory.map(order => order.orderId);
      const orderDetails = await getOrderDetailsByOrderId(orderIds);
      setOrderDetails(orderDetails);
    } else {
      setModalTrue();
    }
  }, [userId]);

  const getAddress = (address) => {
    const { line1, line2, city, state, country, postal_code } = address;
    return `${line1}, ${line2 ? `${line2},` : ''} ${city}, ${state}, ${country}, ${postal_code}`;
  }

  return (
    <div className='flex justify-center bg-gray-100'>
      <Head>
        <title>Nike | Orders</title>
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
            Your Orders
          </div>

          <div className='shadow-md w-full h-80 flex justify-center' style={{ background: '#B8B8B8' }}>
            <img
              loading='lazy'
              src='/images/l.jpg'
              alt='banner'
            />
          </div>

          {
            isEmpty(orderDetails) && (
              <Fragment>
                <div className='mt-10 text-center tracking-widest font-extralight text-lg'>No Orders</div>
                <Link href='/kicks'>
                  <div className='mt-4 flex items-center justify-center'>
                    <Button
                      btnText={'CONTINUE SHOPPING'}
                    />
                  </div>
                </Link>
              </Fragment>
            )
          }

          {
            !isEmpty(orderDetails) && orderDetails?.map((order, index) => (
              <div style={{ background: '#F7F7F7' }} className={`my-4 border-2 border-gray-400 shadow-md rounded-md overflow-hidden flex flex-col-reverse lg:flex-row`} key={index}>
                <div className='w-full lg:w-1/2'>
                  <div className='flex flex-col items-start'>
                    {
                      order.items.map((item, index) => (
                        <Link key={index} href={`/kicks/${item.id}`}>
                          <div className='flex justify-center items-center cursor-pointer'>
                            <div>
                              <Image
                                src={item.image}
                                width={100}
                                height={100}
                                objectFit='contain'
                                layout='fixed'
                              />
                            </div>
                            <p className='text-lg tracking-widest font-extralight text-blue-700'>{item.name}</p>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                </div>

                <div className='w-full lg:w-1/2 pl-4 py-1 lg:pt-8 space-y-2 bg-gray-100'>
                  <div className='tracking-widest'>
                    <span className='font-semibold'>Order Id:</span> {order.id.substring(0,20)}...
                  </div>
                  <div className='tracking-widest'>
                    <span className='font-semibold'>Order Placed:</span> {getDate(order.timestamp)}
                  </div>
                  <div className='tracking-widest'>
                    <span className='font-semibold'>Total Amount:</span> &#8377;{formatPrice(order.amount)}
                  </div>
                  <div className='tracking-widest'>
                    <span className='font-semibold'>Shipped To:</span> {order.shippingDetails.shippedTo}
                  </div>
                  <div className='tracking-widest'>
                    <span className='font-semibold'>Shipping Address:</span> {getAddress(order.shippingDetails.shippingAddress)}
                  </div>
                </div>
              </div>
            ))
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
  setUserData: (args) => setUserData(args),
  setModalTrue: () => setModalTrue(),
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
