import Link from 'next/link';
import Image from 'next/image';
import { HiStar } from 'react-icons/hi';

import { formatPrice } from '../../helpers/formatCurrency';
import Button from '../Button/button';

const Card = ({ Item }) => {
  return (
    <div className='relative flex flex-col items-center pb-4 space-y-4 m-4 shadow-md rounded' style={{ background: '#F6F6F6' }}>
      <Image
        src={Item.images[0]}
        width={300}
        height={300}
        objectFit='contain'
      />
      <h4 className='tracking-widest font-extralight text-xl text-center'>{Item.name}</h4>
      <div className='flex items-center justify-center absolute top-4 right-6'>
        {!!(Item.stars / Item.raters) ? (Item.stars / Item.raters).toFixed(2) : 0}
        <HiStar className='mt-0.5 ml-1 text-yellow-500' />
      </div>
      <div className='tracking-widest font-bold text-xl'>&#8377;{formatPrice(Item.price)}</div>
      <p className='text-sm line-clamp-3 px-3 tracking-widest text-justify'>{Item.desc}</p>
      <Link href='#'>
        <div><Button btnText={'VIEW'} /></div>
      </Link>
    </div>
  )
}

export default Card
