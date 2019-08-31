import React, {useState, useEffect} from 'react'
import HeaderNav from './components/header-nav'
import HeaderSwiper from './components/header-swiper'
import Product from './components/product'
import Advantage from './components/advantage'
import Solution from './components/solution'
import Partner from './components/partner'
import Footer from './components/footer'

const Index: React.FC<{}> = () => {
  const [styleTop, setStyleTop] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => {
    window.removeEventListener('scroll', scroll)

    }
  })

  const scroll = () => {
    if (window.scrollY > 10 && !styleTop) {
      setStyleTop(true)
    }
    if (window.scrollY <= 0 && styleTop) {
      setStyleTop(false)
    }
  }

  return (
    <React.Fragment>
      <HeaderNav 
        styleTop={styleTop}
      />
      <HeaderSwiper />
      <Product />
      <Advantage />
      <Solution />
      <Partner />
      <Footer />
    </React.Fragment> 
  )
}

export default Index

