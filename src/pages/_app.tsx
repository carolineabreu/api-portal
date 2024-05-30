import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
      <ToastContainer theme="colored" />
    </main>
  );
}

export default MyApp;
