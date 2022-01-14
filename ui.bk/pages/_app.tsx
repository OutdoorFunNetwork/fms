import '../sass/styles.scss';
import type { AppProps } from 'next/app'
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState(null);

  return (
    <Component {...pageProps} />
  );
};
export default App;
