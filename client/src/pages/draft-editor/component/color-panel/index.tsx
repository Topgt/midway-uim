import React from 'react'
import classnames from 'classnames'
import Select from '../select'
import {IareasValue} from '../../config/tool-bar-config'
import style from './style.less'

interface IcolorPanel{
  change: (s: string) => void
  disabled: boolean
  areas: IareasValue
  lable?: string
  fontIcon?: string
  initValue?: string
}

const ColorPanel: React.FC<IcolorPanel> = (props) => {
  const {disabled, change, areas, lable, fontIcon, initValue='#000000'} = props
  const [selectColor, setColor] = React.useState(initValue)
  const colorLable = (
    <span className={style.lable}>
      <span className="iconfont" dangerouslySetInnerHTML={{__html: `${fontIcon}`}} />
      <em style={{backgroundColor: selectColor}} />
    </span>)
  return (
    <Select
      disabled={disabled}
      className={classnames({tooltip: !disabled})}
      initValue={initValue}
      onChange={change}
      tooltip={lable}
      lable={colorLable}
    >
      {
        areas.map(({value}, idx) => (
          <Select.Option
            className={style.option}
            key={idx}
          >
            {
              (v: string, setv:(s: string)=>void) => {
                return (value as string[]).map((colorHex, i) => (
                  <span
                    className={style.colorItem}
                    key={`${idx}-${i}`}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      if(colorHex !== v) {
                        setv(colorHex)
                        setColor(colorHex)
                      }
                    }}
                  >
                    <span 
                      style={{
                        backgroundColor: colorHex
                      }}
                    />
                    {
                        v === colorHex
                          ? <i className="iconfont" dangerouslySetInnerHTML={{__html: '&#xe61c;'}}/>
                          : ''
                      }
                  </span>
                ))
              }
            }
          </Select.Option>
        ))}
    </Select>
  )
}

export default ColorPanel

