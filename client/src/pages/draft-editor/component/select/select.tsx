import React from "react"
import Context from './context'
import Option from './option'

import styl from './style.less'
import {ISelect, ISelectOption, IOptionProps} from './index.d'

const Select: ISelect<ISelectOption> = props => {
  let { disabled, className, tooltip, children, initValue, lable, onChange } = props
  if (!React.Children.count(children)) {
    return <div />
  }
  let initSelect = ({} as {props: IOptionProps}) 
  if (initValue) {
    initSelect = (children as any).find(({props}: any) => props.value === initValue) || {}
  }
  const [visible, setVisible] = React.useState(false)
  const [selectOption, changeSelect] = React.useState((initSelect.props || {}))
  const selectRef = React.useRef((null as any))

  React.useEffect(() =>{
    const globalClick = (e: Event) => {
      let target = e.target
      while (target && (target as Element).nodeName !== 'BODY') {
        if (target === selectRef.current) {
          e.preventDefault()
          break
        }
        target = (target as Element).parentElement
      }
      
      if (!target || (target as Element).nodeName === 'BODY') {
        e.preventDefault()
        setVisible(false)
        return
      }
    }
    if (document.querySelector('body')) {
      (document.querySelector('body') as any).addEventListener('click', globalClick, false)
    }
    return () => {
      if (document.querySelector('body')) {
        (document.querySelector('body') as any).removeEventListener('click', globalClick)
      }
    }
  }, [])

  const contextValue = {
    v: selectOption.value || initValue,
    setV: (v: string) => {
      const selected = (children as any).find(({props}: any) => props.value === v) || {}
      changeSelect(selected.props || {value: v})
      typeof onChange === 'function' && onChange(v)
    }
  }

  return (
    <div
      ref={ref => selectRef.current = ref}
      className={styl.select}
      disabled={disabled}
    >
      <div
        className={className}
        tooltip={tooltip}
        onMouseDown={(e) => {
          e.preventDefault()
          setVisible(disabled ? false : !visible)
      }}
      >
        <span className={styl.lake}>
          {lable || selectOption.lable || selectOption.value || initValue}
          <i />
        </span>
      </div>
      <Context.Provider value={contextValue}>
        <div
          className={styl.dropDown}
          style={{
            display: `${visible ? "inline-flex" : "none"}`,
          }}
        >
          {children}
        </div>
      </Context.Provider>
    </div>
  )
}

Select.Option = Option

export default Select