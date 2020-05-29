import React from 'react'
import style from './partner.less'

import backgroundImage from '../../../images/icon-company-0.png'
import company1 from '../../../images/icon-company-1.png'
import company2 from '../../../images/icon-company-2.png'
import company3 from '../../../images/icon-company-3.png'
import company4 from '../../../images/icon-company-4.png'
import company5 from '../../../images/icon-company-5.png'

const Partner:React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">合作伙伴</p>
          <p className="t-des" />
        </div>
        <ul className={style.company}>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company2} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company3} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company4} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company5} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
          <li className={style.item} style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={company1} width="55" height="55" alt="" />
          </li>
        </ul>
      </div>
    </article>
  )
}

export default Partner
