'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container-wide">

          <div className="footer-top">

            <div className="footer-top-left">
              <div className="footer-logo">
                <a href="/" className="logo-section">
                  <Image src="/logo-tecvibes.webp" alt="We Love Rave" width={350} height={45} />
                </a>
              </div>
              <p className="footer-text">
                Sua fonte definitiva para notícias sobre música eletrônica. Cobertura completa de festivais, lançamentos, entrevistas exclusivas com DJs e produtores.
              </p>
              <p className="footer-text">
                <strong>Email:</strong> contact@weloverave.club
              </p>
            </div>

          </div>

          <div className="footer-middle">
            {/* Newsletter Widget - Beehiiv */}
            <div className="footer-widget">
              <div className="widget widget-newsletter">
                <p className="widget-text">
                  Inscreva-se na nossa newsletter para receber as últimas notícias.
                </p>
                <iframe
                  src="https://subscribe-forms.beehiiv.com/53b63e20-6c57-4b77-8bcb-a6f596870bd8"
                  className="beehiiv-embed"
                  data-test-id="beehiiv-embed"
                  frameBorder="0"
                  scrolling="no"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '60px',
                    margin: 0,
                    borderRadius: '0px',
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-wide">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2026 WeLoveRave. Todos os direitos reservados.
            </div>
            <div className="footer-social">

              <a href="https://www.facebook.com/weloverave.club/" target="_blank" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com/WeLoveRaveClub" target="_blank" className="social-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/weloverave.club/" target="_blank" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@weloverave.club" target="_blank" className="social-link" aria-label="YouTube">
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
  )
}

export default Footer