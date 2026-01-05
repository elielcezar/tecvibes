export const fetchPosts = async () => {
    try {
        const response = await fetch('https://scriby.co/api/posts', {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data.map(post => mapPost(post));
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export const fetchCategorias = async () => {
    try {
        const posts = await fetchPosts();
        const categoriasMap = new Map();

        posts.forEach(post => {
            // mapPost already sets post.category as a string (the main category name)
            // But we might want access to the original category object structure if available,
            // or we reconstruct it here based on the mapped post.
            // Let's rely on the fact that mapPost extracts the primary category name.
            
            if (post.category && post.category !== 'General') {
                 // Create a slug for the category
                const slug = normalizeText(post.category).replace(/\s+/g, '-');
                
                if (!categoriasMap.has(slug)) {
                    categoriasMap.set(slug, {
                        id: slug, // Use slug as ID since we don't have a separate ID
                        nome: post.category,
                        slug: slug,
                        // We can keep the color logic here or in mapPost, 
                        // but usually categories list needs just name and slug.
                    });
                }
            }
        });

        return Array.from(categoriasMap.values());

    } catch (error) {
        console.error('Error fetching categorias:', error);
        return [];
    }
};

export const fetchPostById = async (id) => {
    try {
        const posts = await fetchPosts();
        // Ensure comparison is safe (API might return string or number)
        const post = posts.find(p => String(p.id) === String(id));
        return post || null;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
};

export const fetchPostBySlug = async (slug) => {
    try {
        const normalizedSlug = slug.trim().toLowerCase();
        const posts = await fetchPosts();
        
        const post = posts.find(p => {
             // Compare with the mapped slug (which comes from urlAmigavel)
             return p.slug.toLowerCase() === normalizedSlug;
        });
        
        return post || null;
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
};

export const fetchRelatedPosts = async (currentPostId, limit = 5) => {
    try {
        const posts = await fetchPosts();
        const currentPost = posts.find(p => String(p.id) === String(currentPostId));

        if (!currentPost) return [];

        return posts
            .filter(post => String(post.id) !== String(currentPostId) && post.category === currentPost.category)
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
};

// Utility function to normalize text (remove accents, lowercase)
const normalizeText = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};

// Function to search posts
export const searchPosts = (posts, query) => {
    if (!query || query.trim() === '') {
        return posts;
    }

    const normalizedQuery = normalizeText(query);
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);

    return posts.filter(post => {
        // Fields to search
        const title = normalizeText(post.title);
        const excerpt = normalizeText(post.excerpt);
        const content = normalizeText(post.content?.replace(/<[^>]*>/g, '') || ''); // Remove HTML tags
        const category = normalizeText(post.category);
        const tags = (post.tags || []).map(tag => normalizeText(tag)).join(' ');

        // Concatenate all searchable fields
        const searchableText = `${title} ${excerpt} ${content} ${category} ${tags}`;

        // Verify if all query words are present
        return queryWords.every(word => searchableText.includes(word));
    });
};

const mapPost = (apiPost) => {
    // Extract the first image if available, otherwise use a placeholder
    let image = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80'; // Default fallback
    if (apiPost.imagens && apiPost.imagens.length > 0) {
        image = apiPost.imagens[0];
    }

    // Map category - categorias is an array in the new API too
    let category = 'General';
    let categoryColor = 'blue';
    
    if (apiPost.categorias && apiPost.categorias.length > 0) {
        // Assuming apiPost.categorias[0] has a 'nome' property based on typical structure,
        // or it might be just a string? The previous code assumed object with 'nome'.
        // Let's assume object based on previous code, but be safe.
        const cat = apiPost.categorias[0];
        category = typeof cat === 'string' ? cat : (cat.nome || 'General');

        // Map category color based on category name
        const categoryLower = category.toLowerCase();
        if (categoryLower.includes('festival') || categoryLower.includes('festivais')) {
            categoryColor = 'pink';
        } else if (categoryLower.includes('dj') || categoryLower.includes('djs')) {
            categoryColor = 'blue';
        } else if (categoryLower.includes('lançamento') || categoryLower.includes('release') || categoryLower.includes('lanzamiento')) {
            categoryColor = 'red';
        } else if (categoryLower.includes('notícia') || categoryLower.includes('news') || categoryLower.includes('noticias') || categoryLower.includes('noticia')) {
            categoryColor = 'purple';
        } else if (categoryLower.includes('review') || categoryLower.includes('reviews')) {
            categoryColor = 'purple';
        } else {
            categoryColor = 'blue';
        }
    }

    // Map tags
    const tags = apiPost.tags && apiPost.tags.length > 0 
        ? apiPost.tags.map(tag => typeof tag === 'string' ? tag : (tag.nome || tag))
        : [];

    // Format date
    let date = 'Date not available';
    if (apiPost.dataPublicacao) {
        const dateObj = new Date(apiPost.dataPublicacao);
        const formatted = dateObj.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        // Capitalize first letter
        date = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    // Calculate read time
    const wordCount = apiPost.conteudo ? apiPost.conteudo.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
        id: apiPost.id,
        title: apiPost.titulo || 'No title',
        excerpt: apiPost.chamada || '',
        content: apiPost.conteudo || '',
        image: image,
        category: category,
        categoryColor: categoryColor,
        author: 'WeLoveRave Team',
        authorImage: 'https://i.pravatar.cc/150?img=12',
        date: date,
        slug: apiPost.urlAmigavel || '',
        featured: apiPost.destaque || false,
        tags: tags,
        comments: 0,
        readTime: `${readTime} min`,
        status: apiPost.status || 'PUBLICADO',
    };
};
