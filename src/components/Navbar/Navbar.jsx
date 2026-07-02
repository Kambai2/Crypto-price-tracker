import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { CoinContext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const currencyOptions = [
  { code: 'usd', label: 'USD', group: 'Popular', symbol: '$' },
  { code: 'eur', label: 'EUR', group: 'Popular', symbol: '€' },
  { code: 'gbp', label: 'GBP', group: 'Popular', symbol: '£' },
  { code: 'jpy', label: 'JPY', group: 'Popular', symbol: '¥' },
  { code: 'cad', label: 'CAD', group: 'Popular', symbol: 'C$' },
  { code: 'aud', label: 'AUD', group: 'Popular', symbol: 'A$' },
  { code: 'ngn', label: 'NGN', group: 'African', symbol: '₦' },
  { code: 'zar', label: 'ZAR', group: 'African', symbol: 'R' },
  { code: 'chf', label: 'CHF', group: 'European', symbol: 'CHF' },
  { code: 'sek', label: 'SEK', group: 'European', symbol: 'kr' },
  { code: 'nok', label: 'NOK', group: 'European', symbol: 'kr' },
  { code: 'dkk', label: 'DKK', group: 'European', symbol: 'kr' },
  { code: 'pln', label: 'PLN', group: 'European', symbol: 'zł' },
  { code: 'inr', label: 'INR', group: 'Asian', symbol: '₹' },
  { code: 'hkd', label: 'HKD', group: 'Asian', symbol: 'HK$' },
  { code: 'sgd', label: 'SGD', group: 'Asian', symbol: 'S$' },
  { code: 'myr', label: 'MYR', group: 'Asian', symbol: 'RM' },
  { code: 'krw', label: 'KRW', group: 'Asian', symbol: '₩' },
  { code: 'cny', label: 'CNY', group: 'Asian', symbol: '¥' },
  { code: 'brl', label: 'BRL', group: 'Latin America', symbol: 'R$' },
]

const Navbar = () => {

  const { setCurrency} = useContext (CoinContext)
  const [selectedCurrency, setSelectedCurrency] = useState('usd')
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  const currencyHandler = (code)=>{
    const selected = currencyOptions.find((item)=> item.code === code) || currencyOptions[0]
    setSelectedCurrency(selected.code)
    setCurrency({ name: selected.code, symbol: selected.symbol })
    setSearchTerm('')
    setIsOpen(false)
  }

  const filteredOptions = currencyOptions.filter((item)=>{
    const query = searchTerm.toLowerCase()
    return (
      item.label.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.group.toLowerCase().includes(query)
    )
  })

  const activeCurrency = currencyOptions.find((item)=> item.code === selectedCurrency) || currencyOptions[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleBlogNavigation = (event) => {
    event.preventDefault()
    window.location.assign('/blog')
  }

  return (
    <div className='navbar'>
    <Link to={'/'}>
    <img src= {logo} alt=""  className='logo'/>
     </Link>
        <ul>
         <Link to={'/'}><li>Home </li></Link>
            <li><a href="#features">Features</a></li> 
            <li><a href="#faq">FAQ</a></li>
            <Link to={'/blog'} onClick={handleBlogNavigation}><li>Blog</li></Link>
            </ul>  
            <div className='nav-right'>
                <div className='currency-picker' ref={pickerRef}>
                    <button type='button' className='currency-trigger' onClick={()=> setIsOpen(!isOpen)}>
                        <span>{activeCurrency.label}</span>
                        <span className='currency-arrow'>{isOpen ? '▴' : '▾'}</span>
                    </button>
                    {isOpen && (
                        <div className='currency-dropdown'>
                            <input
                                type='text'
                                className='currency-search'
                                placeholder='Search currency'
                                value={searchTerm}
                                onChange={(event)=> setSearchTerm(event.target.value)}
                            />
                            <div className='currency-options'>
                                {filteredOptions.length > 0 ? filteredOptions.map((item)=> (
                                    <button
                                        type='button'
                                        className={`currency-option ${selectedCurrency === item.code ? 'active' : ''}`}
                                        key={item.code}
                                        onClick={()=> currencyHandler(item.code)}
                                    >
                                        <span>{item.label}</span>
                                        <small>{item.group}</small>
                                    </button>
                                )) : <div className='currency-empty'>No currency found</div>}
                            </div>
                        </div>
                    )}
                </div>
                </div> 
    </div>
  )
}

export default Navbar
