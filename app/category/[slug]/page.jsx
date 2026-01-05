import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/Hero/HeroSection'
import Sidebar from '@/components/Sidebar/Sidebar'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import PostsList from '@/components/PostsList/PostsList'
import { fetchPosts, fetchCategorias } from '@/services/api'
import { notFound } from 'next/navigation'
import '@/app/posts/posts.css'

export async function generateMetadata({ params }) {
    const { slug } = await params

    const categorias = await fetchCategorias()
    const categoria = categorias.find(c => c.slug === slug)
    const categoryName = categoria?.nome || slug

    return {
        title: `${categoryName} | WeLoveRave`,
        description: `Electronic music news about ${categoryName}`,
    }
}

export default async function CategoryPage({ params }) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const posts = await fetchPosts()
    const categorias = await fetchCategorias()

    // Find the category object for display name
    const categoria = categorias.find(c => c.slug === decodedSlug)
    const categoriaNome = categoria?.nome || decodedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    // Helper to generate slug from category name (same logic as api.js)
    const generateCategorySlug = (name) => {
        if (!name) return ''
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/\s+/g, '-')
    }

    // Filter posts by comparing slugs
    const filteredPosts = posts.filter(post => {
        if (!post.category) return false
        const postCategorySlug = generateCategorySlug(post.category)
        return postCategorySlug === decodedSlug
    })

    return (
        <main className="posts-page">
            <HeroSection
                posts={posts}
                categoria={categoriaNome}
                showCategoryTitle={true}
            />
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
        </main>
    )
}
