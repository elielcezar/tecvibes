'use client'

import { useState } from 'react'
import Link from 'next/link'
import PostCard from '@/components/PostCard/PostCard'
import { FaClock, FaBookReader } from 'react-icons/fa'
import './PostsList.css'

const POSTS_PER_PAGE = 10

const PostsList = ({ posts = [], layout = 'grid' }) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE)
  }

  if (posts.length === 0) {
    return null
  }

  // Layout Grid (para home page)
  if (layout === 'grid') {
    return (
      <>
        <div className="posts-grid">
          {visiblePosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button 
              className="btn-load-more" 
              onClick={handleLoadMore}
              aria-label="Carregar Mais"
            >
              Carregar Mais
            </button>
          </div>
        )}
      </>
    )
  }

  // Layout List (para categorias e busca)
  return (
    <>
      <div className="posts-list">
        {visiblePosts.map(post => {
          const slug = post.slug || post.id
          return (
            <Link href={`/${slug}`} key={post.id}>
              <article className="post-list-item">
                <div className="post-list-item__image">
                  <img src={post.image} alt={post.title} />
                  <span className={`post-list-item__category category-tag--${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                <div className="post-list-item__content">
                  <h2 className="post-list-item__title">{post.title}</h2>
                  <div className="post-list-item__meta">
                    <span className="meta-item">
                      <FaClock /> {post.date}
                    </span>
                    {post.readTime && (
                      <span className="meta-item">
                        <FaBookReader /> {post.readTime}
                      </span>
                    )}
                  </div>
                  <p className="post-list-item__excerpt">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-list-item__tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          )
        })}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button 
            className="btn-load-more" 
            onClick={handleLoadMore}
            aria-label="Carregar Mais"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </>
  )
}

export default PostsList