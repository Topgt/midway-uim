import React from 'react'
import classNames from 'classnames';
import Link from 'umi/link';
import style from './header-nav.less'

import logo1 from '../../../images/logo1.png'
import logo2 from '../../../images/logo2.png'

interface Iprops {
  styleTop: boolean
  activetI?: string
}

const HeaderNav: React.FC<Iprops> = ({styleTop, activetI=''}) => {
  const {top} = style
  const [showTop, activet]: [any, any] = [{}, {}]
  showTop[top] = styleTop
  activet[style[activetI]] = true
  return (
    <nav className={classNames(style.nav, showTop)}>
      <div className={style.navBody}>
        <Link className={style.logo} to="/">
          <img className={style.logoImg1} alt="logo1" src={logo2}  />
          <img className={style.logoImg2} alt="logo2" src={logo1}  />
        </Link>
        <ul className={style.menu}>
          <Link className={classNames(activet)} to="/"><li>首页</li></Link>
          <li className={style.menuItme}>
            <span>产品服务</span>
            <ul className={style.menuMenu}>
              <Link to="/onlineClass"><li>高效云课堂</li></Link>
              <Link to="/core"><li>核心技术</li></Link>
              <Link to="/recordModel"><li>成绩建模</li></Link>
              <Link to="/question"><li>体系题库</li></Link>
            </ul>
          </li>
          <Link to="/solution"><li>解决方案</li></Link>
          <Link to="/about/"><li>作者简介</li></Link>
          <a target="_blank" href="https://github.com/Topgt/midway-uim/tree/v1.0.0"><li>查看源码</li></a>
          <li className={style.move} />
        </ul>
      </div>
    </nav>
  )
}

export default HeaderNav
