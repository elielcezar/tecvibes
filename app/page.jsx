import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/Hero/HeroSection'
import MainContent from '@/components/MainContent/MainContent'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, fetchCategorias } from '@/services/api'
import '@/app/posts/posts.css'

export const metadata = {
  title: 'TecVibes',
  description: 'Sua fonte diária de notícias sobre internet, tecnologia. Tudo sobre celulares, computadores e inteligência artificial.',
}

export default async function HomePage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const categoriaSlug = resolvedSearchParams?.categoria

  const posts = await fetchPosts()
  const categorias = await fetchCategorias()

  // Find the actual category name from the slug
  let categoriaNome = null
  if (categoriaSlug) {
    const categoriaEncontrada = categorias.find(cat => cat.slug === categoriaSlug)
    categoriaNome = categoriaEncontrada?.nome || categoriaSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Helper to generate slug from category name
  const generateCategorySlug = (name) => {
    if (!name) return ''
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  const filteredPosts = categoriaSlug
    ? posts.filter(post => {
      if (!post.category) return false
      return generateCategorySlug(post.category) === categoriaSlug
    })
    : posts

  return (
    <main className={categoriaNome ? 'posts-page' : ''}>
      <HeroSection
        posts={posts}
        categoria={categoriaNome}
        showCategoryTitle={!!categoriaNome}
      />
      {categoriaNome ? (
        <div className="container-wide">
          <div className="posts-page-layout">
            <div className="posts-page-main">
              <SectionTitle
                title={categoriaNome}
                subtitle={`${filteredPosts.length} ${filteredPosts.length === 1 ? 'Post' : 'Posts'}`}
              />
              {filteredPosts.length > 0 ? (
                <PostsList posts={filteredPosts} layout="list" />
              ) : (
                <div className="no-posts">
                  <p>No posts found in this category.</p>
                  <Link href="/" className="back-link">
                    Back to all posts
                  </Link>
                </div>
              )}
            </div>
            <aside className="posts-page-sidebar">
              <Sidebar posts={filteredPosts} />
            </aside>
          </div>
        </div>
      ) : (
        <MainContent
          posts={filteredPosts}
        />
      )}
    </main>
  )
}