import React from 'react'
import className from 'classnames'
import style from './solution.less'

import cir from '../../../images/solution-cir.png'
import p2p from '../../../images/solution-p2p.png'
import loan from '../../../images/solution-loan.png'
import finance from '../../../images/solution-finance.png'
import bank from '../../../images/solution-bank.png'
import backgroundImage from '../../../images/solution-bg.png'

const Solution: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">解决方案</p>
          <p className="t-des">完善、成熟的知识体系结构模型，帮助客户轻松巩固知识，提升学习技能</p>
        </div>
        <div className={style.body} style={{backgroundImage: `url(${backgroundImage})`}}>
          <img className={style.cir} src={cir} alt="" />
          <div className={className(style.item, style.item1)}>
            <div className={style.des}>
              <p className={style.desTitle} style={{"textAlign":'right'}}>CtoC</p>
              <p>实时在线云教师，一站式多场景学习方式、身份、学历、成绩等数据，并通过人工智能算法、知识体系模型等，利用决策引擎代替纯人工作业判断模式，快速、高效推算出最优的学习方案。</p>
            </div>
            <img src={p2p} alt="" />
          </div>
          <div className={className(style.item, style.item3)}>
            <img src={loan} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>真题预测</p>
              <p>基于海量合作方数据及高质量学习资料，通过多维数据建模，为教育行业提供高质量资源，通过付费的方式有偿提供。</p>
            </div>
          </div>
          <div className={className(style.item, style.item4)}>
            <div className={style.des}>
              <p className={style.desTitle} style={{"textAlign":'right'}}>终身vip</p>
              <p>深入知识付费业务场景，为用户提供个人一对一的辅导，实时评估学习掌握情况和监控等一站式准确快速提升技能的方案，为用户提供最优质的服务。</p>
            </div>
            <img src={finance} alt="" />
          </div>
          <div className={className(style.item, style.item2)} name="solution-active">
            <img src={bank} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>学校</p>
              <p>全国各个省合作院校的行业数据，实时评估教育方式和未来方向，为用户提供第一手信息，通过知识体系建模等多个场景的解决方案，提升学习成绩。</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Solution