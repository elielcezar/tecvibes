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
      title: 'Post não encontrado',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/${post.slug}`,
      siteName: 'TecVibes',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.date, // Supondo que a API retorna uma data ISO 8601
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
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
  const baseUrl = 'https://tecvibes.com.br'
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
                src="/icon.webp"
                alt="TecVibes"
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
              <strong>Compartilhe:</strong>
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
                src="/icon.webp"
                alt="TecVibes"
                width={80}
                height={80}
                className="author-bio__image"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <div className="author-bio__content">
                <p className="author-bio__description">
                  Gosta do nosso conteúdo? Então faça parte da comunidade entrando para o nosso grupo do <strong>Telegram</strong> e receba nossas notícias antes de todo mundo!
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
