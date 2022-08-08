import { Html } from 'next/document'
import  {Head} from 'next/document'
import {Main} from 'next/document'
import Script from 'next/script'
import { NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4947463072730532"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}