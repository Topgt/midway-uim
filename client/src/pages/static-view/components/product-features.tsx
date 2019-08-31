import React, {useState, useEffect} from 'react'
import style from './product-features.less'

import saas from '../../../images/saas-server.png'
import monitoring from '../../../images/monitoring-server.png'
import multiple from '../../../images/multiple-ways-server.png'
import support from '../../../images/support-server.png'
// import parting from '../../../images/parting-line.png'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
      name?: string
  }
}

const ProductFeatures: React.FC<{}> = () => {
  const [element, setElement] = useState()

  useEffect(()=>{
    window.removeEventListener('scroll', scroll)
  }, [])


  const scroll = () => {
    if (element) {
      checkHeight(element)
    }
  }

  const checkHeight = (element: HTMLElement) => {
    // debugger
    let items = element.querySelectorAll('div[name="item"]')
    if (items) {
      // 滚动条高度+视窗高度 
    	const visible = window.scrollY + document.documentElement.clientHeight
      const eles = items ? Array.prototype.slice.call(items) : []

      eles.forEach((ele: HTMLElement) => {
        const centerY = ele.offsetTop+(ele.offsetHeight/2);
        if(centerY < visible){
          const img = ele.querySelector('img')
          img && img.setAttribute('move', '')
        }
      })

    }
  }

  const addEvent = (element: HTMLElement) => {
    if (element) {
      setElement(element)
      setTimeout(()=> {
        checkHeight(element)
      }, 500)
      window.addEventListener('scroll', scroll)
    }
  }

  return (
    <article className="article" ref={addEvent}>
      <div>
        <div className="title">
          <p className="tname">产品特点</p>
        </div>
        <div className={style.item} name="item">
          <div className={style.des}>
            <p className={style.desTitle}>多维度一站式覆盖K-12</p>
            <p>提供专业的学习体验，绝不仅是视频浏览，包含课程大纲、自动上次 播放、收藏、评论打分等功能，还有相关资料、重点提醒、章节选择，并做到教学资源的全覆盖。</p>
          </div>
          <div style={{width: '275px'}} />
          <img className="move-right" src={saas} alt="" />
        </div>
        <div className={style.item} name="item">
          <img className="move-left" src={monitoring} alt="" />
          <div style={{width: '275px'}} />
          <div className={style.des}>
            <p className={style.desTitle}>智能化云端监控</p>
            <p>数据源可用性，安全性自动检测，主备通道自动切换，实时提供安全可靠的服务</p>
          </div>
        </div>
        <div className={style.item} name="item">
          <div className={style.des}>
            <p className={style.desTitle}>多渠终端点对点服务</p>
            <p>针对用户不同的学习使用场景，我们提供了pad、pc、ios、anandroid等，多种灵活的在线学习方案。</p>
          </div>
          <div style={{width: '275px'}} />
          <img className="move-right" src={multiple} alt="" />
        </div>
        <div className={style.item} name="item">
          <img className="move-left" src={support} alt="" />
          <div style={{width: '275px'}} />
          <div className={style.des}>
            <p className={style.desTitle}>7*24小时在线技术支持</p>
            <p>为了更好的给客户疑解惑，我们成立了7*24小时的在线技术服务团队，随时随地提供不间断技术服务</p>
          </div>
        </div>
      </div>
      {/* <img className={style.imgLine} src={parting} alt="" /> */}
    </article>
  )
  
}

export default ProductFeatures