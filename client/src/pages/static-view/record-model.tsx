import React from 'react'
import HeaderNav from './components/header-nav'
import Banner from './components/banner'
import ProductService from './components/product-service'
import ModelBasis from './components/model-basis'
import Footer from './components/footer'

import img7  from '../../images/item7.png'

function RecordModel () {
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet2"
      />
      <Banner
        img={img7}
        title="学习过程记录"
        des1='学习过程、成绩历史、阶段性成果等全程记录，数据自动建立模型，'
        des2="知识掌握情况一目了然"
      />
      <ProductService />
      <ModelBasis />
      <Footer />
    </React.Fragment>
  )
}

export default RecordModel
