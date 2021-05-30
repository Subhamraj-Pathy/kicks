import { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearToast } from '../../global/actions/toastActions';

const Toast = ({ type, message, clearToast, children }) => {

  useEffect(() => {
    setTimeout(() => {
      clearToast();
    }, 2500);
  }, [type, message]);

  return (
    <div>
      {
        !!message &&
        <div
          className={`
              fixed w-64 h-24 text-center 
              font-semibold flex items-center
              justify-center tracking-widest
              rounded-md border-2 bg-opacity-95 p-1
              top-10 right-1/2 transform translate-x-1/2 z-50
              ${type === 'error' ? 'bg-red-100 border-red-400 text-red-500' : 'bg-green-100 border-green-400 text-green-500'}
            `}
        >
          {message}
        </div>
      }
      {children}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    type: state.ToastReducer.type,
    message: state.ToastReducer.message
  }
}

const mapDispatchToProps = {
  clearToast: () => clearToast()
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
