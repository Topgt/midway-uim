import React, {Fragment} from 'react'
import './static-view-layout.less'

const BaseLayout: React.FC = ({children}) => {
  return (
    <Fragment>
      {children}
    </Fragment>)
}

export default BaseLayout
