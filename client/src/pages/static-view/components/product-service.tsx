import React from 'react'
import style from './product-service.less'

import creditscoring from '../../../images/icon-creditscoring.png'
import credit from '../../../images/icon-credit-report-server.png'
import joint from '../../../images/icon-joint-modeling.png'

const ProductService: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">模型依据</p>
        </div>
        <div className={style.body}>
          <div className={style.row}>
            <div className={style.cell}>
              <img src={creditscoring} alt="" />
              <div className={style.des}>
                <p className={style.desTitle}>章节评分</p>
                <p>以教师评分数据为基础，提取个人每个章节学习记录、预测性强的变量，通过统计模型和机器学习，构建稳定有效的章节评分。</p>
              </div>
            </div>
            <div className={style.cell}>
              <img src={credit} alt="" />
              <div className={style.des}>
                <p className={style.desTitle}>报告成绩</p>
                <p>整合多维度个人学习情况，通过学习建模，生成用户综合成绩报告，为建立成绩数据模型提供支持。</p>
              </div>
            </div>
            <div className={style.cell}>
              <img src={joint} alt="" />
              <div className={style.des}>
                <p className={style.desTitle}>联合建模</p>
                <p>从用实际院校出发，为用户建立一套定制化的成长模型，应用于用户不同省份院校，满足不同院校的教学需求。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductService
