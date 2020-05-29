import React from 'react'
import className from 'classnames'
import style from './programme.less'

import plication from '../../../images/plication.png'
import parting from '../../../images/parting-line.png'
import schemebg1 from '../../../images/plication-bg1.png'
import schemebg2 from '../../../images/plication-bg2.png'
import schemebg3 from '../../../images/plication-bg3.png'

const Programme:React.FC<{}> = () => {
  return (
    <article className="article">
      <div className="">
        <div className="title">
          <p className="tname">解决方案</p>
          <p>针对学生成绩、兴趣、思维开发程度、执行力等个人情况按成绩、兴趣爱好</p>
          <p>建模，建立用户画像，快速短板补齐一站式智能方案</p>
        </div>
        <div className={style.plication}>
          <img src={plication} alt="" />
          <div className={className(style.item, style.item1)}>
            <p>注册</p>
            <p>登录</p>
          </div>
          <div className={className(style.item, style.item2)}>
            <p>选择</p>
            <p>产品</p>
          </div>
          <div className={className(style.item, style.item3)}>
            <p>信息</p>
            <p>加密</p>
          </div>
          <div className={className(style.item, style.item4)}>
            <p>角色</p>
            <p>创建</p>
          </div>
          <div className={className(style.item, style.item5)}>
            <p>成绩</p>
            <p>采集</p>
          </div>
          <div className={className(style.item, style.item6)}>
            <p>角色</p>
            <p>授权</p>
          </div>
          <div className={className(style.item, style.item7)}>
            <p>用户</p>
            <p>画像</p>
          </div>
          <div className={className(style.item, style.item8)}>
            <p>提升</p>
            <p>方案</p>
          </div>
          <div className={className(style.item, style.item9)}>
            <p>学习</p>
            <p>计划</p>
          </div>
          <div className={className(style.item, style.item10)}>
            <p>阶段</p>
            <p>评估</p>
          </div>
          <div className={className(style.item, style.item11)}>
            <p>成绩</p>
            <p>提升</p>
          </div>
        </div>
        <ul className={style.scheme}>
          <li>
            <img src={schemebg1} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>辅助教学</p>
              <p className="des">课程笔记 课程分享 课程标签 课程收藏 课件下载 学习跟踪 课程评论</p>
            </div>
          </li>
          <li>
            <img src={schemebg2} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>网校管理</p>
              <p className="des">数据统计 发送通知 权限分配 财务审核 人员管控 版权保护 站内短信</p>
            </div>
          </li>
          <li>
            <img src={schemebg3} alt="" />
            <div className={style.des}>
              <p className={style.desTitle}>网络课堂</p>
              <p className="des">直播教学 公开课 录播教学 考试题库 互动答疑 投票系统 问卷调查</p>
            </div>
          </li>
        </ul>
      </div>
      <img className="imgLine" src={parting} alt="" />
    </article>
  )
}

export default Programme

// style="width:100%;height:120px;" 
