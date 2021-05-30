import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

import '../styles/globals.css';
import { store, persistor } from '../global/store';
import ModalWrapper from '../hocs/modal/modalWrapper';
import Toast from '../hocs/toast/toast';

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toast>
          <ModalWrapper>
            <Component {...pageProps} />
          </ModalWrapper>
        </Toast>
      </PersistGate>
    </Provider>
  )
}

const getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps: pageProps };
}

export default MyApp
// export default wrapper.withRedux(MyApp)
