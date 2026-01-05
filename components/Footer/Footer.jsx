'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import './Footer.css'

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://tecvibes.kit.com/8be77e31cc/index.js'
    script.async = true
    script.setAttribute('data-uid', '8be77e31cc')

    const container = document.getElementById('newsletter-container')
    if (container) {
      container.appendChild(script)
    }

    // Cleanup function in case the component unmounts
    return () => {
      if (container) {
        // The external script might add more than just the script tag itself,
        // so a simple container.innerHTML = '' is a safer cleanup.
        container.innerHTML = ''
      }
    }
  }, []) // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="footer-middle">
        {/* Newsletter Widget */}
        <div className="footer-widget">
          {/* This div is the container for the script-injected form */}
          <div className="widget widget-newsletter" id="newsletter-container"></div>
        </div>
      </div>
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