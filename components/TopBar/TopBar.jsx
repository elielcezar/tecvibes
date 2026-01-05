'use client'

import React from 'react'
import Image from 'next/image'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'

import './TopBar.css'

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container-wide">
        <div className="topbar-content">
          <div className="topbar-left">

            <div className="social-icons social-icons--desktop">
              <a href="#" target="_blank" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" target="_blank" className="social-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="#" target="_blank" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>


          </div>

          <div className="topbar-center">
            <a href="/" className="logo-section">

              <Image src="/logo-tecvibes2.webp" alt="We Love Rave" width={350} height={45} />

            </a>
          </div>

          <div className="topbar-right">
            {/*<button className="topbar-btn btn-subscribe">SUBSCRIBE</button>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

