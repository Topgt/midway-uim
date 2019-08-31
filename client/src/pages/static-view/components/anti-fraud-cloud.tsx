import React from 'react'
import style from './anti-fraud-cloud.less'

import finger from '../../../images/icon-finger-server.png'
import shape from '../../../images/icon-shape-server.png'
import backuser from '../../../images/icon-backuser-server.png'
import relationship from '../../../images/enterprise-relationship-server.png'
import positioning from '../../../images/internet-positioning-server.png'
import spoofing from '../../../images/anti-spoofing-server.png'
import parting from '../../../images/parting-line.png'

const AntiFraudCloud: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">知识体系AI</p>
        </div>
        <ul className={style.antiFraud}>
          <li className={style.item}>
            <img src={finger} alt="" />
            <div className={style.des}>
              <p className="">用户Id</p>
              <p className="">根据用户信息、网络协议等信息生成用户唯一ID，精确识别用户行为，描摹用户画像</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={shape} alt="" />
            <div className={style.des}>
              <p>基础信息探测</p>
              <p>分析兴趣爱好、历史成绩、所在省份、学校信息等规则，识别用户身份、地理区域</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={backuser} alt="" />
            <div className={style.des}>
              <p>用户行为特征</p>
              <p>根据用户学习行为特征，制定学习计划<br />&nbsp;</p>
            </div>
          </li>
        </ul>
        <ul className={style.antiFraud}>
          <li className={style.item}>
            <img src={relationship} alt="" />
            <div className={style.des}>
              <p>资源共享</p>
              <p>强大的多院校教学资源共享，有效提升教学资源产出效率、资料多元监控、实时资源反馈与共享</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={positioning} alt="" />
            <div className={style.des}>
              <p>知识关系图谱</p>
              <p>分析教材章节关系，高效智能推倒出知识体系结构<br />&nbsp;</p>
            </div>
          </li>
          <li className={style.item}>
            <img src={spoofing} alt="" />
            <div className={style.des}>
              <p>学习计划清单</p>
              <p>建立用户、知识体系结构网络模型，有效的对教学材料行分类</p>
            </div>
          </li>
        </ul>
      </div>
      <img className="imgLine" src={parting} alt="" />
    </article>
  )
}

export default AntiFraudCloud