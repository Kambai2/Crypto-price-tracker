import './Home.css'
import CoinContextProvider, { CoinContext } from '../../context/Coincontext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

const {allCoin, currency} = useContext (CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState ('');
const [theme, setTheme] = useState(() => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return window.localStorage.getItem('cryptoplace-theme') || 'dark'
})

const features = [
  {
    title: 'Live market insights',
    text: 'Track price movements, market cap, and 24-hour changes at a glance.',
    icon: '📈',
    cta: 'See live trends',
    link: '/blog',
  },
  {
    title: 'Smart coin search',
    text: 'Find coins quickly and jump straight into detailed market pages.',
    icon: '🔎',
    cta: 'Explore coins',
    link: '/blog',
  },
  {
    title: 'Educational content',
    text: 'Browse beginner-friendly articles and crypto guides that support your learning journey.',
    icon: '🧠',
    cta: 'Read the blog',
    link: '/blog',
  },
]

const faqs = [
  {
    question: 'How can I make my crypto content more useful for readers?',
    answer: 'Focus on clear explanations, comparisons, and practical beginner advice that answers common questions.',
  },
  {
    question: 'Why is a blog helpful for a crypto website?',
    answer: 'A blog brings consistent traffic, supports SEO, and gives your site more pages that can earn from ads over time.',
  },
  {
    question: 'What kind of content performs well on this type of site?',
    answer: 'Guides, market updates, FAQs, and coin explainers tend to attract engaged readers and search traffic.',
  },
]

const newsCards = [
  {
    title: 'Bitcoin and Ethereum remain central to market attention',
    text: 'Major coins continue to shape trading conversations as investors watch momentum and adoption signals.',
  },
  {
    title: 'New crypto education content boosts reader engagement',
    text: 'Helpful guides and explainers keep visitors browsing longer and make it easier to build trust.',
  },
  {
    title: 'Market trackers help readers compare opportunities faster',
    text: 'Clear price data and simple summaries make it easier for beginners to follow the space with confidence.',
  },
]

const howToBuySteps = [
  'Choose a trusted exchange or wallet platform.',
  'Create an account and complete basic verification.',
  'Deposit funds and compare available coins before buying.',
  'Store your assets securely and keep track of your entries.',
]

const glossaryTerms = [
  { term: 'Bitcoin', definition: 'The first and most widely known cryptocurrency, often used as a benchmark for the market.' },
  { term: 'Altcoin', definition: 'Any cryptocurrency other than Bitcoin, often built for different use cases or features.' },
  { term: 'Wallet', definition: 'A tool that stores your crypto keys and helps you manage access to your assets securely.' },
  { term: 'Market Cap', definition: 'The total value of a coin based on its current price multiplied by the circulating supply.' },
]

const inputHandler = (event)=>{
setInput(event.target.value);
if (event.target.value === ""){
  setDisplayCoin(allCoin);
}
}
const searchHandler = async (event)=>{
event.preventDefault();
const coins = await allCoin.filter((item)=>{
return item.name.toLowerCase().includes(input.toLowerCase())
})
setDisplayCoin(coins);
}

useEffect(()=>{
  setDisplayCoin(allCoin);
},[allCoin])

useEffect(() => {
  window.localStorage.setItem('cryptoplace-theme', theme)
}, [theme])

const toggleTheme = () => {
  setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
}

const handleBlogNavigation = (event) => {
  event.preventDefault()
  window.location.assign('/blog')
}

  return (
    <div className={`home home-theme-${theme}`}>
      <div className='home-toolbar'>
        <button className='theme-toggle' onClick={toggleTheme} type='button' aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </div>
     <div className="hero">
      <h1>
        Largest <br/> Crypto Marketplace
      </h1>
      <p>Explore live crypto prices, discover new coins, and read helpful content built for modern investors.</p>
      <form onSubmit={searchHandler}>

        <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..' required/>

<datalist id='coinlist'>
  {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
</datalist>

        <button type="submit">Search</button>
      </form>
     </div>

     <section className="features-section" id="features">
      <div className="section-heading">
        <p className="section-tag">Features</p>
        <h2>Everything you need to explore crypto with confidence.</h2>
        <p>From instant price tracking to educational articles, Cryptoplace is designed to keep your journey simple and useful.</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <Link to={feature.link} className="feature-link" onClick={handleBlogNavigation}>
              {feature.cta}
            </Link>
          </div>
        ))}
      </div>
     </section>

     <div className="crypto-table">
      <div className="table-layout">
      <p>#</p>
      <p>Coins</p>
      <p>Price</p>
      <p style={{textAlign:"center"}}>24 hour change</p>
      <p className='market-cap'>Market Cap</p>
      </div>
{
  displayCoin.slice(0,20).map((item, index)=>(
    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
<p>{item.market_cap_rank}</p>
 <div>
  <img src={item.image} alt="" />
  <p>{item.name + " - " + item.symbol}</p>
 </div>
 <p>{currency.symbol} { item.current_price.toLocaleString()}</p>
 <p className={item.price_change_percentage_24h>0?"green":"red"}>
  {Math.floor(item.price_change_percentage_24h*100)/100}</p>
 <p className='market-cap'>{currency.symbol} 
  {item.market_cap.toLocaleString()}</p>
    </Link>
  ))
}
     </div>

     <section className="content-section">
      <Link to='/blog' className="content-card" onClick={handleBlogNavigation}>
        <h3>Why crypto education matters</h3>
        <p>Understanding price moves, market cap, and project fundamentals helps you make more confident decisions in a fast-moving space.</p>
      </Link>
      <Link to='/blog' className="content-card" onClick={handleBlogNavigation}>
        <h3>Explore more with the blog</h3>
        <p>Use our content hub to read beginner guides, market explainers, and AdSense-friendly articles that grow your audience over time.</p>
      </Link>
      <Link to='/blog' className="content-card" onClick={handleBlogNavigation}>
        <h3>Track smartly</h3>
        <p>Watch price trends, compare coins, and stay up to date with the most relevant metrics before you act.</p>
      </Link>
     </section>

     <section className="news-section">
      <div className="section-heading">
        <p className="section-tag">News</p>
        <h2>Latest crypto highlights for your readers.</h2>
      </div>
      <div className="news-grid">
        {newsCards.map((item, index) => (
          <article className="news-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
     </section>

     <section className="guide-section">
      <div className="section-heading">
        <p className="section-tag">Guide</p>
        <h2>How to buy crypto safely.</h2>
      </div>
      <div className="guide-card">
        <p>New to crypto? Start with a simple plan: choose a reputable platform, learn the basics, and never invest more than you can afford to lose.</p>
        <ul>
          {howToBuySteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
     </section>

     <section className="glossary-section">
      <div className="section-heading">
        <p className="section-tag">Glossary</p>
        <h2>Quick crypto terms to know.</h2>
      </div>
      <div className="glossary-grid">
        {glossaryTerms.map((item, index) => (
          <div className="glossary-card" key={index}>
            <h3>{item.term}</h3>
            <p>{item.definition}</p>
          </div>
        ))}
      </div>
     </section>

     <section className="faq-section" id="faq">
      <div className="section-heading">
        <p className="section-tag">FAQ</p>
        <h2>Helpful answers for growing your crypto content site.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details key={index} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
     </section>
     </div>
  )
}

export default Home
