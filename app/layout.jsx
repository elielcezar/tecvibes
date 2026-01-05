import { Inter } from 'next/font/google'
import Script from 'next/script'
import TopBar from '@/components/TopBar/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { fetchCategorias } from '@/services/api'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://tecvibes.com.br'),
  title: {
    default: 'TecVibes',
    template: '%s | TecVibes',
  },
  description: 'Sua fonte diária de notícias sobre internet, tecnologia. Tudo sobre celulares, computadores e inteligência artificial.',
  openGraph: {
    title: 'TecVibes',
    description: 'Notícias de tecnologia, internet, celulares, computadores e IA.',
    url: 'https://tecvibes.com.br',
    siteName: 'TecVibes',
    images: [
      {
        url: '/logo-tecvibes.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TecVibes',
    description: 'Notícias de tecnologia, internet, celulares, computadores e IA.',
    images: ['/logo-tecvibes.webp'],
  },
}

export default async function RootLayout({ children }) {
  const categorias = await fetchCategorias()

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNF85SXR88"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', G-VNF85SXR88');
          `}
        </Script>
        <TopBar />
        <Header categorias={categorias} />
        {children}
        <Footer />

      </body>
    </html>
  )
}

