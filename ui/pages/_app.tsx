import '../sass/styles.scss';
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default App;
