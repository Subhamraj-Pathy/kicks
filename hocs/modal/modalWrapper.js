import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { IoIosCloseCircle } from 'react-icons/io';
import { setModalFalse } from '../../global/actions/modalActions';

const ModalWrapper = ({ modalState, setModalFalse, children }) => {

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className='relative'>

      {
        (modalState && showLogin) &&
        <div className='z-50 bg-blue-300 bg-opacity-60 w-screen min-h-screen shadow fixed flex items-center justify-center p-4'>
          <div className='w-full lg:w-auto h-auto bg-white rounded flex flex-col lg:flex-row-reverse'>

            <div className='relative w-full lg:w-auto p-6 pt-10 lg:pt-0 bg-black flex items-center justify-center text-8xl font-bold tracking-widest'>
              <div className='relative text-white'>
                NIKE
                <div className='bg-black text-white absolute top-1/2 left-1/2 transform -translate-y-1/4 -translate-x-1/2 w-full text-center text-xl font-thin'>JUST DO IT</div>
              </div>
              <div className='text-white absolute top-4 right-4 cursor-pointer' onClick={() => setModalFalse()}><IoIosCloseCircle className='text-xl' /></div>
            </div>

            <div className='w-full lg:w-96 h-auto bg-white flex flex-col p-5'>
              <h4 className='py-2 tracking-widest font-semibold text-xl'>Welcome !</h4>
              <p className='py-2 tracking-widest text-justify font-thin text-md'>How about you login and we find you some aweome kicks ?</p>
              <input type='text' placeholder='Email . . .' className='p-2 border border-gray-300 my-2 tracking-widest font-extralight' />
              <input type='password' placeholder='Password . . .' className='p-2 border border-gray-300 my-2 tracking-widest font-extralight' />
              <button className='tracking-widest font-extralight text-lg py-2 px-4 bg-black text-white mt-2'>LOGIN</button>
              <p className='text-center text-md tracking-widest font-thin pt-4'>Don't have an account ? <span onClick={() => { setShowLogin(false); setShowRegister(true); }} className='cursor-pointer font-semibold'>Register Now</span></p>
            </div>

          </div>
        </div>
      }

      {
        (modalState && showRegister) &&
        <div className='z-50 bg-blue-300 bg-opacity-60 w-screen min-h-screen shadow fixed flex items-center justify-center p-4'>
          <div className='w-full lg:w-auto h-auto bg-white rounded flex flex-col lg:flex-row-reverse'>

            <div className='relative w-full lg:w-auto p-6 pt-10 lg:pt-0 bg-black flex items-center justify-center text-8xl font-bold tracking-widest'>
              <div className='relative text-white'>
                NIKE
                <div className='bg-black text-white absolute top-1/2 left-1/2 transform -translate-y-1/4 -translate-x-1/2 w-full text-center text-xl font-thin'>JUST DO IT</div>
              </div>
              <div className='text-white absolute top-4 right-4 cursor-pointer' onClick={() => setModalFalse()}><IoIosCloseCircle className='text-xl' /></div>
            </div>

            <div className='w-full lg:w-96 h-auto bg-white flex flex-col p-5'>
              <h4 className='py-2 tracking-widest font-semibold text-xl'>Hi There !</h4>
              <input type='text' placeholder='Name . . .' className='p-2 border border-gray-300 my-2 tracking-widest font-extralight' />
              <input type='text' placeholder='Email . . .' className='p-2 border border-gray-300 my-2 tracking-widest font-extralight' />
              <input type='password' placeholder='Password . . .' className='p-2 border border-gray-300 my-2 tracking-widest font-extralight' />
              <button className='tracking-widest font-extralight text-lg py-2 px-4 bg-black text-white mt-2'>REGISTER</button>
              <p className='text-center text-md tracking-widest font-thin pt-4'>Already have an account ? <span onClick={() => { setShowLogin(true); setShowRegister(false); }} className='cursor-pointer font-semibold'>Login</span></p>
            </div>

          </div>
        </div>
      }

      {children}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    modalState: state.ModalReducer.modalState
  }
}

const mapDispatchToProps = {
  setModalFalse: () => setModalFalse()
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper)
