import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPostBySlug, fetchRelatedPosts } from '@/services/api'
import { notFound } from 'next/navigation'
import { FaFacebookF, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import '@/app/posts/posts.css'
import './post.css'

export async function generateMetadata({ params }) {
  const { slug } = await params
  
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post not found | WeLoveRave'
    }
  }

  return {
    title: `${post.title} | WeLoveRave`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  
  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await fetchRelatedPosts(post.id)

  // Build full URL for sharing
  const baseUrl = 'https://weloverave.club'
  const postUrl = `${baseUrl}/${slug}`
  const shareTitle = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(postUrl)

  // Share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`
  }

  return (
    <main className="single-post">    
      <div className="container">       

        <div className="single-post__hero">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 200px"
                priority
                style={{ objectFit: 'cover' }}
                className="single-post__image"
              />
            </div>

            {/* Post Header */}
            <header className="post-header">
              <span className={`post-category category-tag--${post.categoryColor}`}>
                {post.category}
              </span>

              <h1 className="post-title">{post.title}</h1>

              <div className="post-excerpt">
                <p className="post-excerpt__text">{post.excerpt}</p>
              </div>
             
              <div className="post-meta">
                <div className="post-author">
                  <Image
                    src="/heart.png"
                    alt="WeLoveRave"
                    width={50}
                    height={50}
                    className="post-author__image"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                  <div className="post-author__info">
                    <span className="post-author__name">by {post.author}</span>
                    <span className="post-author__date">{post.date}</span>
                  </div>
                </div>

                {/* Social Share */}
                <div className="post-share">
                  <strong>Share:</strong>
                  <div className="share-buttons">
                    <a 
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--facebook"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a 
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--twitter"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--linkedin"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn share-btn--whatsapp"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>

              </div>
            </header>

                  
        
        <div className="single-post__layout">
        
          
          {/* Main Content */}
          <article className="single-post__content">            
            {/* Post Body */}
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                <strong>Tags:</strong>
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">{tag}</span>
                ))}
              </div>
            )}            

            {/* Author Bio */}
            <div className="author-bio">
              <Image
                src="/heart.png"
                alt="WeLoveRave"
                width={80}
                height={80}
                className="author-bio__image"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <div className="author-bio__content">                
                <p className="author-bio__description">
                  Help spread electronic music to the world! WeLoveRave publishes content about the best festivals, releases and news. Send your news suggestion to contact@weloverave.club and see your content read by everyone!
                </p>
              </div>
            </div>
          
          </article>

          {/* Sidebar */}
          <aside className="single-post__sidebar">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="sidebar-widget">
                <h3 className="sidebar-widget__title">Related Posts</h3>
                <div className="related-posts">
                  {relatedPosts.map(relatedPost => {
                    const postSlug = relatedPost.slug || `${relatedPost.id}`
                    return (
                      <Link href={`/${postSlug}`} key={relatedPost.id}>
                        <article className="related-post">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            width={100}
                            height={80}
                            className="related-post__image"
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div className="related-post__content">
                            <h4 className="related-post__title">{relatedPost.title}</h4>
                            <span className="related-post__date">{relatedPost.date}</span>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
