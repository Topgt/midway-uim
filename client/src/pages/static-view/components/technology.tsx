import React from 'react'
import className from 'classnames'
import style from './technology.less'

import bg from '../../../images/antiFraudServer.png'
import scheme1 from '../../../images/scheme-loan1.png'
import scheme2 from '../../../images/scheme-loan2.png'
import scheme3 from '../../../images/scheme-loan3.png'
import scheme4 from '../../../images/scheme-loan4.png'

const Technology: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">技术领先</p>
        </div>
        <div className={style.scheme}>
          <img className={style.bg} src={bg} alt="" />
          <div className={className(style.item, style.item1)}>
            <img src={scheme1} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>高效的实时决策引擎</p>
              <p>分布式高并发架构，实时集群并行运算，60毫秒内完成实时决策    </p>
            </div>
          </div>
          <div className={className(style.item, style.item2)}>
            <img src={scheme2} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>成熟的机器学习模型</p>
              <p>提取多纬度的用户学习特征，综合多样化的机器学习算法，动态的学习计划报告</p>
            </div>
          </div>
          <div className={className(style.item, style.item3)}>
            <img src={scheme3} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>定制化学习资料集</p>
              <p>定制化学习资料模版，灵活多样的规则选择，多维度章节选择</p>
            </div>
          </div>
          <div className={className(style.item, style.item4)}>
            <img src={scheme4} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>知识体系图谱</p>
              <p>分析海量教学资源数据之间的关系，展现不同科目、不同章节、不同难道间的关联层，识构建知识体系图谱</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Technology