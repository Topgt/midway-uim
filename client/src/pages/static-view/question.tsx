import React from 'react'
import HeaderNav from './components/header-nav'
import Banner from './components/banner'
import ProductFeatures from './components/product-features'
import Technology from './components/technology'
import Footer from './components/footer'

import img8  from '../../images/item8.png'

const Core: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet2"
      />
      <Banner
        img={img8}
        title="知识体系结构"
        des1='全方位覆盖K-12各个阶段的优质教学资源，通过智能人工智能算法推倒出知识体系'
        des2="关系结构，学时掌握更轻松"
      />
      <ProductFeatures />
      <Technology />
      <Footer />
    </React.Fragment> 
  )
}

export default Core
