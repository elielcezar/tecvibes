import React from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar/Sidebar'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, searchPosts } from '@/services/api'
import { notFound } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import '@/app/posts/posts.css'
import './search.css'

export const metadata = {
  title: 'TecVibes',
  description: 'Sua fonte diária de notícias sobre internet, tecnologia. Tudo sobre celulares, computadores e inteligência artificial.',
}

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams?.q || ''

  const posts = await fetchPosts()
  const filteredPosts = searchPosts(posts, query)

  return (
    <main className="posts-page search-page">
      {/* Search Header */}
      <div className="search-page-hero">
        <div className="container-wide">
          <h1 className="search-page-title">
            {query ? 'Results for' : 'Search'}

            {query && (
              <strong className="search-page-query"> "{query}"</strong>
            )}
          </h1>

          <p className="search-page-count">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result found' : 'results found'}
          </p>
        </div>
      </div>

      <div className="container-wide">
        <div className="posts-page-layout">
          <div className="posts-page-main">
            {filteredPosts.length > 0 ? (
              <PostsList posts={filteredPosts} layout="list" />
            ) : (
              <div className="no-posts">
                <div className="no-results-icon">
                  <FaSearch />
                </div>
                <p>No results found for your search.</p>
                {query && (
                  <p className="no-results-suggestion">Try searching for a different keyword or category.</p>
                )}
                <Link href="/" className="back-link">
                  Back to all posts
                </Link>
              </div>
            )}
          </div>
          <aside className="posts-page-sidebar">
            <Sidebar posts={posts.slice(0, 5)} />
          </aside>
        </div>
      </div>
    </main>
  )
}