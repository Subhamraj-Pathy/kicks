import '../styles/globals.css';
import { wrapper } from '../global/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
