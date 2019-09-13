import React from 'react'
import className from 'classnames'
import style from './model-basis.less'

import bg from '../../../images/creditServer.png'

const ModelBasis: React.FC<{}> = () => {
  return (
    <article className="article">
      <div>
        <div className="title">
          <p className="tname">模型输出</p>
        </div>
        <div className={style.body}>
          <img src={bg} alt="" />
          <div className={className(style.item, style.item1)}>语文</div>
          <div className={className(style.item, style.item2)}>数学</div>
          <div className={className(style.item, style.item3)}>英语</div>
          <div className={className(style.item, style.item4)}>化学</div>
          <div className={className(style.item, style.item5)}>物理</div>
        </div>
      </div>
    </article>
  )
}

export default ModelBasis
