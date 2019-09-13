import React from 'react'
import HeaderNav from './components/header-nav'
import Banner from './components/banner'
import AntiFraudCloud from './components/anti-fraud-cloud'
import TechnologyLeading from './components/technology-leading'
import Footer from './components/footer'

import img6  from '../../images/item6.png'

const Core: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet2"
      />
      <Banner
        img={img6}
        title="产品核心技术"
        des1='人工智能推理算法，为学生提供最优学习、复习计划，考试技巧和考后成绩数据建模'
        des2="等一站式服务，学习与提升一目了然"
      />
      <AntiFraudCloud />
      <TechnologyLeading />
      <Footer />
    </React.Fragment> 
  )
}

export default Core
