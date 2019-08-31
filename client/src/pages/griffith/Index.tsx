import React from 'react'
import Player from 'griffith'
import style from './index.less'

const sources = {
  sd: {
    bitrate: 580,
    size: 6531802,
    duration: 89,
    format: 'mp4',
    width: 320,
    height: 240,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    // play_url: 'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/ld-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
  ld: {
    bitrate: 580,
    size: 6531802,
    duration: 89,
    format: 'mp4',
    width: 320,
    height: 240,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    // play_url: 'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/ld-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
  hd: {
    bitrate: 580,
    size: 6531802,
    duration: 89,
    format: 'mp4',
    width: 320,
    height: 240,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    // play_url: 'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/ld-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
}

const props = {
  id: 'zhihu2018',
  title: '2018 我们如何与世界相处？',
  standalone: true,
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/player.png',
  duration: 89,
  sources,
  error: {
    message: '出错了'
  },
  shouldObserveResize: true,
}

function Index () {
  return (
    <article className={style.article}>
      <Player {...props} />
    </article>
  )
}

export default Index