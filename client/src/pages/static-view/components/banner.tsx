import React from 'react'
import style from './banner.less'

interface Iprops {
  title: string
  img: string
  des1: string
  des2: string
  des3?: string
}

const Banner: React.FC<Iprops> =  (props) => {
  const {title, img, des1, des2, des3} = props
  return (
    <article className={style.inner}>
      <div className={style.des}>
        <div className={style.title}>{title}</div>
        <div className={style.item}>{des1}</div>
        <div className={style.item}>{des2}</div>
        <div className={style.item}>{des3}</div>
      </div>
      <img src={img} className="banner-img" alt="banner" />
    </article>
  )
}

export default Banner