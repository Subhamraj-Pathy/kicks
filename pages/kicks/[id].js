import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import { forEach, includes, remove } from 'lodash';
import { GoHeart } from 'react-icons/go';
import { HiStar, HiPlus } from 'react-icons/hi';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { FaCheckSquare, FaWindowClose } from 'react-icons/fa'

import Nav from '../../components/Navbar';
import { findRating, getKickById, isShoeBought } from '../../helpers/kicks';
import { formatPrice } from '../../helpers/formatCurrency';
import Button from '../../components/Button/button';
import { setUserData } from '../../global/actions/userActions';
import { setToast } from '../../global/actions/toastActions';
import { firebase, FieldValue } from '../../lib/firebase';

const Kick = ({ userData, userId, setToast, setUserData }) => {

  const { bag, wishlist } = userData;

  const [kick, setKick] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('/images/Brand-min.png');
  const [selectedImgKey, setSelectedImgKey] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isItemInBag, setIsItemInBag] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);

  useEffect(async () => {
    const kickId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    const queriedKick = await getKickById(kickId);
    setKick(queriedKick[0]);
    const rating = await findRating(queriedKick[0].raters, userId);
    setRating(rating);
    forEach(bag, (el) => {
      if (el.id === queriedKick[0].id) {
        setIsItemInBag(true);
      }
    });
    setSelectedImg(queriedKick[0].images[0]);
    setLoading(false);

    const isBought = await isShoeBought(userData.orderHistory, kickId);
    setIsBought(isBought);
  }, [userData]);

  const handleRating = async () => {
    if (rating > 0) {
      const ratingsArray = kick.raters;
      const numOfRaters = ratingsArray.length;
      const ratingsSoFar = kick.stars;
      const starsNow = (ratingsSoFar + rating) / (numOfRaters + 1);
      await firebase.firestore().collection('Products').doc(kick.id).update({
        raters: FieldValue.arrayUnion({ rating, ratedBy: userId }),
        stars: starsNow
      })
      setShowRatingDropdown(false);
      setToast({ type: 'success', message: 'Your Rating is submitted.' });
    } else {
      setToast({ type: 'error', message: 'Set a rating first' });
    }
  }

  const handleWishlist = () => {
    if (userId) {
      firebase.firestore().collection('users').doc(userId)
        .update({
          wishlist: includes(wishlist, kick.id) ?
            FieldValue.arrayRemove(kick.id)
            :
            FieldValue.arrayUnion(kick.id)
        })
        .then(() => {
          const wishlistItems = wishlist;
          if (includes(wishlist, kick.id)) {
            remove(wishlistItems, (i) => i === kick.id);
          } else {
            wishlistItems.push(kick.id);
          }
          setUserData({
            ...userData,
            wishlist: [...wishlistItems]
          })
        })
    } else {
      setToast({ type: 'error', message: 'You are not logged in.' });
    }
  };

  const handleBag = () => {
    const itemToBag = {
      id: kick.id,
      name: kick.name,
      color: kick.color,
      price: kick.price,
      quantity: 1,
      size: selectedSize,
      image: kick.images[0]
    }
    if (userId) {
      if (selectedSize) {
        firebase.firestore().collection('users').doc(userId)
          .update({
            bag: FieldValue.arrayUnion(itemToBag)
          })
          .then(() => {
            const bagItems = bag;
            if (!isItemInBag) {
              bagItems.push(itemToBag);
              setUserData({
                ...userData,
                bag: [...bagItems]
              });
              setIsItemInBag(true);
              setToast({ type: 'success', message: 'Item added to cart' });
            }
          })
      } else {
        setToast({ type: 'error', message: 'Please select a size' });
      }
    } else {
      setToast({ type: 'error', message: 'You are not logged in.' });
    }
  };

  return (
    <div className='flex justify-center bg-gray-100'>
      <Head>
        <title>Nike | Buy</title>
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
            !loading &&
            <div className='flex flex-col lg:flex-row w-full'>

              <div className='w-full lg:w-3/5 flex flex-col-reverse lg:flex-row'>
                <div className='flex flex-row lg:flex-col h-auto justify-center'>
                  {
                    kick?.images.map((el, i) => (
                      <div key={i} onClick={() => { setSelectedImg(el); setSelectedImgKey(i); }} className={`cursor-pointer rounded overflow-hidden m-2 border ${selectedImgKey === i ? 'border-red-400' : 'border-gray-300'} hover:border-gray-800 shadow-md`}>
                        <Image
                          src={el}
                          width={120}
                          height={120}
                          priority={true}
                        />
                      </div>
                    ))
                  }
                </div>
                <div className='m-2 flex-grow flex items-start justify-center'>
                  <div className='border border-gray-300 shadow-md rounded-md overflow-hidden'>
                    <Image
                      src={selectedImg}
                      width={580}
                      height={600}
                      layout='intrinsic'
                      priority={true}
                    />
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-2/5 flex flex-col items-center lg:items-start pt-2 lg:pt-16'>
                <div className='text-3xl font-thin tracking-widest text-center lg:text-left px-2'>{kick.name}</div>
                <div className='text-lg tracking-widest text-center px-2 pt-2 flex items-center font-semibold'>{!!(kick.stars) ? kick.stars : 0} <HiStar className='mt-0.5 ml-1 text-yellow-500' /></div>
                <div className='text-2xl font-extralight tracking-widest text-center px-2 pt-2'>{kick.color}</div>
                <div className='text-3xl font-bold tracking-widest text-center px-2 pt-4'>&#8377;{formatPrice(kick.price)}</div>
                <div className='text-lg font-extralight tracking-widest text-center text-gray-600 px-2 pt-2'>.incl of taxes and duties</div>
                <div className='px-2 py-2 lg:pt-6 flex items-center' onClick={() => !isItemInBag ? handleBag() : null}>
                  <Button
                    disabled={isItemInBag}
                    btnText={isItemInBag ? 'ADDED TO BAG' : 'ADD TO BAG'}
                  />
                  <div className='text-3xl cursor-pointer hidden lg:flex pl-10' onClick={(e) => { e.stopPropagation(); handleWishlist(); }}>
                    <GoHeart className={`${includes(wishlist, kick.id) ? 'text-red-700' : 'text-gray-400'} text-opacity-90`} />
                  </div>
                </div>
                <div className='text-3xl cursor-pointer block lg:hidden absolute top-20 right-6' onClick={() => { handleWishlist(); }}>
                  <GoHeart className={`${includes(wishlist, kick.id) ? 'text-red-700' : 'text-gray-400'} text-opacity-90`} />
                </div>
                <div className='text-lg font-extralight tracking-widest text-center px-2 pt-4'>Select Size</div>
                <div className='grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3'>
                  {
                    kick?.sizes.map((el, i) => (
                      <div
                        onClick={() => setSelectedSize(el.number)}
                        className={`
                            cursor-pointer m-2 px-6 py-3
                            border hover:border-gray-800
                            ${selectedSize === el.number ? 'border-red-500' : 'border-gray-200'}
                            tracking-widest rounded-md
                            ${selectedSize === el.number ? 'shadow-md' : 'shadow-sm'}
                          `}
                        key={i}
                      >
                        {el.number}
                      </div>
                    ))
                  }
                </div>
                <div className='text-md lg:text-lg font-extralight tracking-widest text-justify px-4 lg:px-2 pt-4'>{kick.desc}</div>
                <div className='text-2xl font-extralight tracking-widest text-center px-2 py-4 flex items-center cursor-pointer hover:underline'>
                  Reviews ({kick.reviews.length})
                  <IoMdArrowDropdown className='mt-1.5 ml-4' />
                </div>

                {
                  showRatingDropdown  ?
                  <div className='px-2 mb-6 flex items-center justify-evenly'>
                    {/* <input autoFocus={true} className='p-3 border-b-2 border-gray-600 w-10 outline-none shadow-md' /> */}
                    <div className='flex items-center space-x-2'>
                      <HiStar className={`${(rating >= 1 || ratingHover >= 1) ? 'text-2xl text-yellow-400' : 'text-xl'} cursor-pointer`} onClick={() => setRating(1)} onMouseEnter={() => setRatingHover(1)}  onMouseLeave={() => setRatingHover(0)} />
                      <HiStar className={`${(rating >= 2 || ratingHover >= 2) ? 'text-2xl text-yellow-400' : 'text-xl'} cursor-pointer`} onClick={() => setRating(2)} onMouseEnter={() => setRatingHover(2)}  onMouseLeave={() => setRatingHover(0)} />
                      <HiStar className={`${(rating >= 3 || ratingHover >= 3) ? 'text-2xl text-yellow-400' : 'text-xl'} cursor-pointer`} onClick={() => setRating(3)} onMouseEnter={() => setRatingHover(3)}  onMouseLeave={() => setRatingHover(0)} />
                      <HiStar className={`${(rating >= 4 || ratingHover >= 4) ? 'text-2xl text-yellow-400' : 'text-xl'} cursor-pointer`} onClick={() => setRating(4)} onMouseEnter={() => setRatingHover(4)}  onMouseLeave={() => setRatingHover(0)} />
                      <HiStar className={`${(rating >= 5 || ratingHover >= 5) ? 'text-2xl text-yellow-400' : 'text-xl'} cursor-pointer`} onClick={() => setRating(5)} onMouseEnter={() => setRatingHover(5)}  onMouseLeave={() => setRatingHover(0)} />
                    </div>
                    <FaWindowClose onClick={() => setShowRatingDropdown(false)} className='text-red-600 text-2xl cursor-pointer mx-4' />
                    <FaCheckSquare onClick={() => handleRating()} className='text-green-600 text-2xl cursor-pointer' />
                  </div>
                  :
                  rating === 0 ?
                  <div
                    onClick={() => { isBought ? setShowRatingDropdown(!showRatingDropdown) : setToast({ type: 'error', message: 'You need to buy the product before rating it.' }) }}
                    className='ml-2 mb-4 py-1 px-4 border-2 border-black border-dashed text-xl tracking-widest font-thin cursor-pointer flex items-center'
                  >
                    <HiPlus className='mt-0.5 mr-1' />
                    Rate
                  </div>
                  :
                  <div className='mx-2 mb-4 text-gray-500 text-justify tracking-widest text-lg font-thin'>You've rated {rating} stars to this Product.</div>
                }

              </div>

            </div>
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
  setToast: (args) => setToast(args),
}

export default connect(mapStateToProps, mapDispatchToProps)(Kick)
