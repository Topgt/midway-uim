import React, { ReactNode } from "react"
import Context from './context'

import styl from './style.less'
import {IOptionProps} from './index.d'

const Option: React.FC<IOptionProps> = props => {
  const { value, children, lable, className, style} = props
  let optlable = children
  if (!children) {
    optlable = <div>{lable}</div>
  }
  return (
    <Context.Consumer>
      {({v, setV }) => (
        <div className={`${styl.option} ${className}`} style={style}>
          {typeof optlable === 'function'
            ? <div>{optlable(v, setV)}</div>
            : (
                <div
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setV(value)
                  }}
                >
                  {optlable}
                </div>)
          }
        </div>
      )}
    </Context.Consumer>
  )
}

export default Option
