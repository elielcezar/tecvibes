'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './Sidebar.css'

const Sidebar = ({ posts = [] }) => {
  // Derive trending posts (e.g., first 5)
  const trendingPosts = posts.slice(0, 5);

  return (
    <div className="sidebar">

      {/* Ad Space */}
      <div className="sidebar-widget ad-widget">
        {/* Espaço para Publi */}
      </div>
    </div>
  )
}

export default Sidebar