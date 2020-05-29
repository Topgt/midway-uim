import React from 'react'
import style from './technology-leading.less'

import step1 from '../../../images/skill-step1.png'
import step2 from '../../../images/skill-step2.png'
import step3 from '../../../images/skill-step3.png'

const TechnologyLeading: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">技术领先</p>
        </div>
        <ul className={style.body}>
          <li className={style.item}>
            <img src={step1} alt="" />
            <div className={style.des}>
              <p>全量题库</p>
              <p>海量云真题各科目全覆盖，数据质量行业领先。</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={step2} alt="" />
            <div className={style.des}>
              <p>极致体验</p>
              <p>一键登录，验证码自动识别，查询秒级响应，数据真实还原。</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={step3} alt="" width="125" height="90" />
            <div className={style.des}>
              <p>高可用</p>
              <p>微服务架构，多点容灾，多通道自动切换，有效保证系统服务的高可用性。</p>
            </div>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default TechnologyLeading
