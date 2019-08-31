import React from 'react'
import { connect } from 'dva';
import HeaderNav from './components/header-nav'
// import Markdow from '../markdown/Index'
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
      {/* <Markdow content={fileContent} handle={downFile} /> */}
      <Footer />
    </React.Fragment>
  )
}

export default connect(({views}: any) => ({
  ...views
}))(props =>  <About {...props} />)
