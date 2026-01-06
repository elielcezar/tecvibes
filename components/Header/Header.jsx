'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import './Header.css'

const Header = ({ categorias = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // Handler para submeter a busca
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      router.push(searchUrl)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Handler para mudança no input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="header">
      <div className="container-wide">
        <div className="header-content">

          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <li key={categoria.id} className="nav-item">
                    <Link
                      href={`/category/${categoria.slug}`}
                      className="nav-link"
                    >
                      {categoria.nome.toUpperCase()}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    NOTÍCIAS
                  </Link>
                </li>
              )}
            </ul>

            <div className="social-icons social-icons--mobile">
              <a href="https://www.facebook.com/people/TecVibes/61585951238952/" target="_blank" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com/tecvibesbr" target="_blank" className="social-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/tecvibesbr/" target="_blank" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </nav>

          {/* Search (Right) */}
          <div className="header-actions">
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header