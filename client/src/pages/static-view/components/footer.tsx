import React from 'react'
import className from 'classnames'
import style from './footer.less'

import phone from '../../../images/icon-phone.png'
import wx from '../../../images/icon-wx.png'
import QQ from '../../../images/icon-qq.png'

function Footer () {
  return (
    <footer className="footer">
      <div className={style.inner}>
        <div>
          <div className={style.item}>
            <p>地址：广东省广州市天河区岑村西街</p>
            <p>电话：13535034695</p>
            <p>技术支持：topgt1@163.com</p>
          </div>
          <div className={style.item}>
            <img src={phone} alt="" />
            <div className={style.workMsg}>
              <p className={style.phNumber}>13535034695</p>
              <p className={style.workTime}>工作时间：周一至周五</p>
            </div>
            <p>合作&建议：topgt1@163.com</p>
          </div>
          <div className={className(style.item, style.qrCode)}>
            <img src={wx} alt="" />
            <img src={QQ} alt="" />
          </div>
        </div>
      </div>
      <div className={style.copyright}>
        <span>版权所有： Copyright @2019 广东省广州市天河区岑村西街</span>
      </div>
    </footer>
  )
}

export default Footer
