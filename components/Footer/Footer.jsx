
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import './Footer.css'

const Footer = () => {

  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="container-wide">

            <div className="footer-top">

              <div className="footer-top-left">
                <div className="footer-logo">
                  <a href="/" className="logo-section">
                    <Image src="/logo-tecvibes2.webp" alt="We Love Rave" width={300} height={39} />
                  </a>
                </div>
                <p className="footer-text">
                  Sua fonte diária de notícias sobre internet, tecnologia. Tudo sobre celulares, computadores e inteligência artificial.
                </p>
                <p className="footer-text">
                  <strong>Email:</strong> contato@tecvibes.com.br
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container-wide">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                © 2026 TecVibes. Todos os direitos reservados.
              </div>
              <div className="footer-social">

                <a href="#" target="_blank" className="social-link" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" target="_blank" className="social-link" aria-label="Twitter">
                  <FaXTwitter />
                </a>
                <a href="#" target="_blank" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" target="_blank" className="social-link" aria-label="YouTube">
                  <FaTiktok />
                </a>
              </div>
              <nav className="footer-nav">
                <Link href="/">Home</Link>
                <Link href="/">Notícias</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer