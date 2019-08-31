import React from 'react'
import HeaderNav from './components/header-nav'
import Banner from './components/banner'
import Programme from './components/programme'
import Footer from './components/footer'

import img4  from '../../images/item4.png'

const Solution: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet3"
      />
      <Banner
        img={img4}
        title="高效提升方案"
        des1='基于大数据云课堂，为学生提供在线视频、考试、成绩数据建模等一站式提升'
        des2="成绩的方案"
      />
      <Programme />
      <Footer />
    </React.Fragment> 
  )
}

export default Solution