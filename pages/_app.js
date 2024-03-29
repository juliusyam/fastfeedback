import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import ProvideAuth from '@/lib/auth';
import theme from '@/styles/theme';
import { Global, css} from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function GlobalStyle({children}) {

  return (<>
    <CSSReset />
    <Global
      styles={css`
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Poppins', sans-serif !important;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f5f5f5;
        }
      `}
    />
    {children}
  </>)
}

function App({ Component, pageProps }) {
  return (<>
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <DefaultSeo {...SEO} />
        <GlobalStyle />
        <Component {...pageProps} />
      </ProvideAuth>
    </ThemeProvider>
  </>)
}

export default App;
