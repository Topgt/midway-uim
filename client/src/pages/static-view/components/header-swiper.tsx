import React, {Component} from 'react'
import { Carousel } from 'antd';
import classNames from 'classnames';
import style from './header-swiper.less'

import img1 from '../../../images/item1.png'
import img2 from '../../../images/item2.png'
import img3 from '../../../images/item3.png'

const HeaderSwiper: React.FC<{}> = () => {

  const [showItem1, setshowItem1] = React.useState(false)
  const [showItem2, setshowItem2] = React.useState(false)
  const [showItem3, setshowItem3] = React.useState(false)

  const assignRef = () => {
    setshowItem1(true)
  };

  const beforeChange = (index: number) =>{
    if (index+1 === 1) setshowItem1(false)
    else if (index+1 === 2) setshowItem2(false)
    else if (index+1 === 3) setshowItem3(false)
  }

  const afterChange = (index: number) => {
    if (index+1 === 1) setshowItem1(true)
    else if (index+1 === 2) setshowItem2(true)
    else if (index+1 === 3) setshowItem3(true)
  }

  const {aniSlide1, aniSlide2, aniSlide3} = style
  const aniSlide:{[key:string]: boolean} = {}
  aniSlide[`${aniSlide1}`] = showItem1
  aniSlide[`${aniSlide2}`] = showItem2
  aniSlide[`${aniSlide3}`] = showItem3
  return (
    <Carousel
      autoplay
      ref={assignRef}
      beforeChange={beforeChange}
      afterChange={afterChange}
    >
      <div className={style.inner}>
        <div className={classNames(style.des, style.des1, aniSlide)}>
          <div className={style.title}>大数据云题库</div>
          <div className={style.boy}>习题集智能推荐、多维数据建模、深度挖掘信息价值，</div>
          <div className={style.boy}>优质的教育资源服务提供商</div>
        </div>
        <img src={img1} alt="1" />
      </div>
      <div className={style.inner}>
        <div className={classNames(style.des, style.des2, aniSlide)}>
          <div className={style.title}>完善知识体系</div>
          <div className={style.boy} style={{textAlign: 'left'}}>建立完善知识体系、一站式发掘提升决方案。</div>
        </div>
        <img src={img2} alt="2" />
      </div>
      <div className={style.inner}>
        <div className={classNames(style.des, style.des3, aniSlide)}>
          <div className={style.title}>在线辅导服务</div>
          <div className={style.boy}>高效、高灵活性、成绩分析、数据建模</div>
        </div>
        <img src={img3} alt="3" />
      </div>
    </Carousel>
  )
}

export default HeaderSwiper