import { Fragment } from 'react';
import MobileMenu from './mobileMenu';
import SideNav from './sideNav';

const Nav = () => {
  return (
    <Fragment>
      <div className='hidden lg:inline'>
        <SideNav />
      </div>
      <div className='flex lg:hidden'>
        <MobileMenu />
      </div>
    </Fragment>
  )
}

export default Nav
