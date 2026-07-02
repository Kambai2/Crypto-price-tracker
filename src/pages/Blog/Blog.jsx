import { useEffect, useState } from 'react'
import './Blog.css'

const starterPosts = [
  {
    id: 1,
    title: 'How to grow a crypto blog that earns from AdSense',
    excerpt:
      'A simple publishing plan for building traffic, trust, and monetization around crypto content.',
    content:
      'Start with helpful guides, market explainers, and comparison posts that answer real questions. Keep each article focused on one topic, add a clear headline, and use short sections so readers stay engaged. Consistency matters more than perfection when you are building an audience.',
    category: 'Monetization',
    readTime: '5 min read',
    imageEmoji: '📈',
    imageLabel: 'Monetization playbook',
    sections: [
      'Choose one topic per article',
      'Use beginner-friendly headings',
      'Add short paragraphs and clear takeaways',
    ],
  },
  {
    id: 2,
    title: 'Why crypto education content performs well in search',
    excerpt:
      'Educational posts attract long-tail traffic and give your site more pages to monetize.',
    content:
      'Readers often search for beginner guides, market updates, and tool comparisons. If your blog answers those questions clearly, you can earn traffic from search and build a more dependable content engine for AdSense.',
    category: 'SEO',
    readTime: '4 min read',
    imageEmoji: '🔍',
    imageLabel: 'Search growth',
    sections: [
      'Answer common beginner questions',
      'Target clear search intent',
      'Keep the article easy to scan',
    ],
  },
  {
    id: 3,
    title: 'How to buy crypto safely as a beginner',
    excerpt:
      'A practical guide for readers who want a simple, low-stress way to start with crypto.',
    content:
      'Begin with trusted platforms, learn the basics of security, and never rush into a purchase without understanding the risks. Readers appreciate simple steps and honest advice when they are just getting started.',
    category: 'Guide',
    readTime: '6 min read',
    imageEmoji: '🛡️',
    imageLabel: 'Safe beginner guide',
    sections: [
      'Start with a reputable platform',
      'Verify security basics',
      'Use small amounts while learning',
    ],
  },
]

const faqs = [
  {
    question: 'How long does it take to get AdSense approval?',
    answer:
      'Most publishers need a polished site, original content, clear navigation, and a privacy policy before approval. A focused blog with useful content usually helps a lot.',
  },
  {
    question: 'What kind of posts help a crypto site earn more traffic?',
    answer:
      'Beginner guides, coin explainers, reviews, market trends, and FAQ-style articles tend to attract steady search traffic and keep visitors engaged.',
  },
  {
    question: 'Should I publish regularly?',
    answer:
      'Yes. A consistent cadence helps search engines understand your site and gives readers more reasons to return. Even one thoughtful post a week can add up over time.',
  },
]

const Blog = () => {
  const [posts, setPosts] = useState(() => {
    if (typeof window === 'undefined') {
      return starterPosts
    }

    const savedPosts = window.localStorage.getItem('cryptoplace-blog-posts')
    return savedPosts ? JSON.parse(savedPosts) : starterPosts
  })

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Tips',
  })
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    return window.localStorage.getItem('cryptoplace-theme') || 'dark'
  })
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
  })
  const [likesByPost, setLikesByPost] = useState(() => {
    if (typeof window === 'undefined') {
      return {}
    }

    const savedLikes = window.localStorage.getItem('cryptoplace-blog-likes')
    return savedLikes ? JSON.parse(savedLikes) : {}
  })
  const [commentsByPost, setCommentsByPost] = useState(() => {
    if (typeof window === 'undefined') {
      return {}
    }

    const savedComments = window.localStorage.getItem('cryptoplace-blog-comments')
    return savedComments ? JSON.parse(savedComments) : {}
  })

  useEffect(() => {
    window.localStorage.setItem('cryptoplace-blog-posts', JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    window.localStorage.setItem('cryptoplace-blog-comments', JSON.stringify(commentsByPost))
  }, [commentsByPost])

  useEffect(() => {
    window.localStorage.setItem('cryptoplace-blog-likes', JSON.stringify(likesByPost))
  }, [likesByPost])

  useEffect(() => {
    window.localStorage.setItem('cryptoplace-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    const newPost = {
      id: Date.now(),
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim() || 'A new entry for your crypto blog.',
      content: formData.content.trim(),
      category: formData.category.trim() || 'Tips',
      readTime: 'New post',
      imageEmoji: '✍️',
      imageLabel: 'Fresh article',
      sections: [
        'Introduction',
        'Main explanation',
        'Helpful takeaway',
      ],
    }

    setPosts((previous) => [newPost, ...previous])
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Tips',
    })
  }

  const handleCommentChange = (event) => {
    const { name, value } = event.target
    setCommentForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    if (!selectedPost || !commentForm.name.trim() || !commentForm.message.trim()) {
      return
    }

    const newComment = {
      id: Date.now(),
      name: commentForm.name.trim(),
      message: commentForm.message.trim(),
      createdAt: new Date().toLocaleString(),
    }

    setCommentsByPost((previous) => ({
      ...previous,
      [selectedPost.id]: [newComment, ...(previous[selectedPost.id] || [])],
    }))

    setCommentForm({
      name: '',
      message: '',
    })
  }

  const handleLikePost = () => {
    if (!selectedPost) {
      return
    }

    setLikesByPost((previous) => ({
      ...previous,
      [selectedPost.id]: (previous[selectedPost.id] || 0) + 1,
    }))
  }

  const selectedPost = posts.find((post) => post.id === selectedPostId) || null
  const relatedPosts = selectedPost
    ? posts.filter((post) => post.id !== selectedPost.id).slice(0, 2)
    : []
  const selectedPostComments = selectedPost ? commentsByPost[selectedPost.id] || [] : []
  const selectedPostLikes = selectedPost ? likesByPost[selectedPost.id] || 0 : 0

  return (
    <div className={`blog-page blog-theme-${theme}`}>
      <div className='blog-toolbar'>
        <button className='theme-toggle' onClick={toggleTheme} type='button' aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </div>

      <section className='blog-hero'>
        <div>
          <p className='eyebrow'>Cryptoplace Blog</p>
          <h1>Publish helpful content and grow your AdSense revenue.</h1>
          <p>
            Use this section to share crypto insights, beginner guides, and monetization tips that build trust and attract readers.
          </p>
        </div>
        <div className='blog-hero-card'>
          <h2>Quick tips</h2>
          <ul>
            <li>Write around clear search intent.</li>
            <li>Keep your posts easy to scan.</li>
            <li>Use SEO-friendly headlines and callouts.</li>
          </ul>
        </div>
      </section>

      <section className='blog-content'>
        <div className='blog-form-card'>
          <h2>Write a new article</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='title'
              placeholder='Article title'
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='excerpt'
              placeholder='Short description'
              value={formData.excerpt}
              onChange={handleChange}
            />
            <select name='category' value={formData.category} onChange={handleChange}>
              <option value='Tips'>Tips</option>
              <option value='SEO'>SEO</option>
              <option value='Monetization'>Monetization</option>
              <option value='Market'>Market</option>
            </select>
            <textarea
              name='content'
              rows='6'
              placeholder='Write your article content here...'
              value={formData.content}
              onChange={handleChange}
              required
            />
            <button type='submit'>Publish article</button>
          </form>
        </div>

        <div className='blog-posts'>
          <div className='posts-heading'>
            <h2>Latest posts</h2>
            <p>Update these cards anytime to keep your blog fresh and useful.</p>
          </div>

          {selectedPost ? (
            <article className='blog-card blog-card-detail'>
              <button className='back-button' onClick={() => setSelectedPostId(null)} type='button'>← Back to posts</button>
              <div className='blog-card-top'>
                <span>{selectedPost.category}</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <div className='blog-featured-card'>
                <div className='blog-featured-icon'>{selectedPost.imageEmoji}</div>
                <div>
                  <span className='blog-featured-label'>{selectedPost.imageLabel}</span>
                  <p>Featured article for your crypto audience.</p>
                </div>
              </div>
              <div className='article-actions'>
                <button className='like-button' onClick={handleLikePost} type='button'>👍 Like · {selectedPostLikes}</button>
              </div>
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.excerpt}</p>
              <div className='blog-card-body'>{selectedPost.content}</div>
              <div className='blog-sections'>
                <h4>Key sections</h4>
                <ul>
                  {selectedPost.sections?.map((section, index) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
              </div>
              <div className='comments-section'>
                <h4>Reader discussion</h4>
                <form className='comment-form' onSubmit={handleCommentSubmit}>
                  <input
                    type='text'
                    name='name'
                    placeholder='Your name'
                    value={commentForm.name}
                    onChange={handleCommentChange}
                    required
                  />
                  <textarea
                    name='message'
                    rows='3'
                    placeholder='Share your thought on this article'
                    value={commentForm.message}
                    onChange={handleCommentChange}
                    required
                  />
                  <button type='submit'>Post comment</button>
                </form>
                <div className='comment-list'>
                  {selectedPostComments.length > 0 ? (
                    selectedPostComments.map((comment) => (
                      <div className='comment-item' key={comment.id}>
                        <div className='comment-meta'>
                          <strong>{comment.name}</strong>
                          <span>{comment.createdAt}</span>
                        </div>
                        <p>{comment.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className='empty-comments'>No comments yet. Start the conversation.</p>
                  )}
                </div>
              </div>
              {relatedPosts.length > 0 && (
                <div className='related-posts'>
                  <h4>Related posts</h4>
                  {relatedPosts.map((post) => (
                    <div className='related-post' key={post.id}>
                      <div>
                        <span>{post.category}</span>
                        <h5>{post.title}</h5>
                      </div>
                      <button onClick={() => setSelectedPostId(post.id)} type='button'>Open</button>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ) : (
            posts.map((post) => (
              <article className='blog-card' key={post.id}>
                <div className='blog-card-top'>
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className='blog-card-body'>{post.content}</div>
                <div className='blog-sections'>
                  <h4>Key sections</h4>
                  <ul>
                    {post.sections?.map((section, index) => (
                      <li key={index}>{section}</li>
                    ))}
                  </ul>
                </div>
                <button className='read-more-button' onClick={() => setSelectedPostId(post.id)} type='button'>Read full article</button>
              </article>
            ))
          )}
        </div>
      </section>

      <section className='faq-section'>
        <div className='faq-heading'>
          <p className='eyebrow'>FAQ</p>
          <h2>Helpful answers for AdSense monetization</h2>
        </div>
        <div className='faq-list'>
          {faqs.map((item, index) => (
            <details key={index} className='faq-item'>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
