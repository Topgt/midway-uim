import React from 'react'
import HeaderNav from './components/header-nav'
import Banner from './components/banner'
import Griffith from '../griffith/index'
import Footer from './components/footer'

import img5  from '../../images/item5.png'

function OnlineClass () {
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet2"
      />
      <Banner
        img={img5}
        title="高效云课堂"
        des1='基于大数据云课堂，为学生提供在线视频、考试、成绩数据建模等一站式提升'
        des2="成绩的方案"
      />
      <Griffith />
      <Footer />
    </React.Fragment>
  )
}

export default OnlineClass