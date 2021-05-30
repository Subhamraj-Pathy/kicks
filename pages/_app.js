import '../styles/globals.css';
import { wrapper } from '../global/store';
import ModalWrapper from '../hocs/modal/modalWrapper';

function MyApp({ Component, pageProps }) {
  return <ModalWrapper><Component {...pageProps} /></ModalWrapper>
}

export default wrapper.withRedux(MyApp)
