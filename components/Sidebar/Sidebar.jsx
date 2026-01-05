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
       <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Destaques</h3>
        <div className="sidebar-posts">
          {trendingPosts.map(post => (
            <Link href={`/${post.slug}`} key={post.id} className="sidebar-post-item">
              <div className="sidebar-post-image">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={80} 
                  height={60} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="sidebar-post-content">
                <h4 className="sidebar-post-title">{post.title}</h4>
                <span className="sidebar-post-date">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Ad Space */}
      <div className="sidebar-widget ad-widget">
         {/* Espaço para Publi */}
      </div>
    </div>
  )
}

export default Sidebar