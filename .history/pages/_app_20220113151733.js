import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { store } from '../redux/store';
import { Provider } from 'react-redux'
import { wrapper } from '../redux/store'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react'



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (document.readyState !== 'loading') {
      setLoaded(true)
    }
  }, [])
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <AnimatePresence exitBeforeEnter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SessionProvider session={session}>
          {
            
          }
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </AnimatePresence>
  )
}
//wrap the app with redux
export default wrapper.withRedux(MyApp);
