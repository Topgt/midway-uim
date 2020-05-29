import React from 'react'
import style from './advantage.less'

import competency1 from '../../../images/code-competency-1.png'
import fingerMar from '../../../images/icon-finger-mar.png'
import competency2 from '../../../images/code-competency-2.png'
import iconAI from '../../../images/icon-AI.png'
import spaceTime from '../../../images/icon-space-time.png'
import competency3 from '../../../images/code-competency-3.png'
import shape from '../../../images/icon-shape.png'
import competency4 from '../../../images/code-competency-4.png'

function Advantage () {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">核心优势</p>
          <p className="t-des">领先的体系结构算法，多维数据建模技术</p>
        </div>
        <ul className={style.competency}>
          <li className={style.item}>
            <img className={style.pick} src={competency1} alt="competency1" />
          </li>
          <li className={style.item}>
            <img className={style.iconImg} src={fingerMar} alt="fingerMar" />
            <p>全栈被动式设备指纹</p>
          </li>
          <li className={style.item}>
            <img className={style.pick} src={competency2} alt="competency2" />
          </li>
          <li className={style.item}>
            <img className={style.iconImg} src={iconAI} alt="iconAI" />
            <p>领先的人工智能技术</p>
          </li>
          <li className={style.item}>
            <img className={style.iconImg} src={spaceTime} alt="spaceTime" />
            <p>时空动能模型</p>
          </li>
          <li className={style.item}>
            <img className={style.pick} src={competency3} alt="competency3" />
          </li>
          <li className={style.item}>
            <img className={style.iconImg} src={shape} alt="shape" />
            <p>毫秒级数据返回</p>
          </li>
          <li className={style.item}>
            <img className={style.pick} src={competency4} alt="competency4" />
          </li>
        </ul>
      </div>
    </article>
  )
}

export default Advantage
