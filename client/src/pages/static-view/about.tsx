import React from 'react'
import { connect } from 'dva';
import { Button, Spin } from 'antd'
import HeaderNav from './components/header-nav'
import Markdow from '../markdown/show'
import Footer from './components/footer'

function About ({fileContent, dispatch}:any) {
  const downFile = () => {
    dispatch({
      type: 'views/downLoad',
      playload: {
        fileName: '杨明业-个人简历.pdf',
      }
    })
  }
  return (
    <React.Fragment>
      <HeaderNav
        styleTop
        activetI="activet4"
      />
      <div style={{height: '50px'}}/>
      <article className="article" style={{minHeight: 'calc(100% - 365px)', display: 'flex', flexDirection: 'column'}}>
        {
          (!fileContent )
            ? (<div style={{flex: 1,display: 'flex', justifyContent: 'center'}}><Spin><i /></Spin></div>)
            : <Markdow content={fileContent} />
        }
        <Button disabled={!fileContent} onClick={downFile} type="primary" icon="download" style={{display:'block', margin: '15px auto 0 auto'}}>
          下载该简历
        </Button>
      </article>
      <Footer />
    </React.Fragment>
  )
}

export default connect(({views}: any) => ({
  ...views
}))(props =>  <About {...props} />)
