import React from 'react'
import classNames from 'classnames';
import style from './product.less'

import fraud from '../../../images/icon-fraud.png'
import credit from '../../../images/icon-credit.png'
import report from '../../../images/icon-credit-report.png'
import testing from '../../../images/icon-testing.png'

const Product: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">产品服务</p>
          <p className="t-des">海量数据，真实、可靠、全面</p>
        </div>
        <div className={classNames(style.boxContent)}>
          <div className={classNames(style.oneOfBox, style.oneOfBox1)}>
            <div className={style.hoverBefore}>
              <div className={style.imgWrap}>
                <img src={fraud} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>在线练习</div>
              <div className={style.mt15}>高质量云题库</div>
              <div className={style.explain}>让难题无处盾形</div>
            </div>
            <div className={style.hoverAfter}>
              <div className={style.imgWrap}>
                <img src={fraud} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>在线练习</div>
              <div className={style.hoverExp}>
                <p>主动式用户画像识别、千万级在线真题、可视化关系网络图谱定让难题无处遁形，准确、高效、精准的算法决策引擎。</p>
              </div>
              <div className={style.detailsWrap}>
                <a href="#">查看详情</a>
              </div>
            </div>
          </div>
          <div className={classNames(style.oneOfBox, style.oneOfBox2)}>
            <div className={style.hoverBefore}>
              <div className={style.imgWrap}>
                <img src={credit} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>知识体系</div>
              <div className={style.mt15}>多纬度数据源</div>
              <div className={style.explain}>准确、快速、稳定的知识体系结构</div>
            </div>
            <div className={style.hoverAfter}>
              <div className={style.imgWrap}>
                <img src={credit} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>知识体系</div>
              <div className={style.hoverExp}>
                <p>基于合理的章节关联，构建网状体系结构，后台系统精准推理出体系结构数据，实现精准的用户知识体系结构评估。</p>
              </div>
              <div className={style.detailsWrap}>
                <a href="#">查看详情</a>
              </div>
            </div>
          </div>
          <div className={classNames(style.oneOfBox, style.oneOfBox3)}>
            <div className={style.hoverBefore}>
              <div className={style.imgWrap}>
                <img src={report} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>在线课堂</div>
              <div className={style.mt15}>高质量在线资源</div>
              <div className={style.explain}>多角度的类型特征展现</div>
            </div>
            <div className={style.hoverAfter}>
              <div className={style.imgWrap}>
                <img src={report} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>在线课堂</div>
              <div className={style.hoverExp}>
                <p>海量教学资源，经过清洗、整合、归类、建模，构造在线课堂，挖掘数据背后的价值，多纬度展现知识本质特征，帮助用户实现精准的提高成绩。</p>
              </div>
              <div className={style.detailsWrap}>
                <a href="#">查看详情</a>
              </div>
            </div>
          </div>
          <div className={classNames(style.oneOfBox, style.oneOfBox4)} style={{borderRight: '1px solid #dcdddd'}}>
            <div className={style.hoverBefore}>
              <div className={style.imgWrap}>
                <img src={testing} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>成绩建模</div>
              <div className={style.mt15}>成熟的算法模型</div>
              <div className={style.explain}>在线练习成绩提取</div>
            </div>
            <div className={style.hoverAfter}>
              <div className={style.imgWrap}>
                <img src={testing} alt='' />
              </div>
              <div className={style.oneOfBoxTitle}>成绩建模</div>
              <div className={style.hoverExp}>
                <p>基于用户在线做题的历史、第三方合作数据信息，结合个人做题侧重方向，运用自主知识产权的评价模型，为用户提供高效的学习计划和推荐云课堂。</p>
              </div>
              <div className={style.detailsWrap}>
                <a href="#">查看详情</a>
              </div>
            </div>
          </div>
          <div style={{clear: 'both'}} />
        </div>
      </div>
    </article>
  )
}

export default Product
