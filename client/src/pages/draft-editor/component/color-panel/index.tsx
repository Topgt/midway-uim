import React from 'react'
import Select from '../select'
import {IareasValue} from '../../config'
import style from './style.less'

interface IcolorPanel{
  change: (s: string) => void
  areas: IareasValue
  lable?: string
  fontIcon?: string
}

const ColorPanel: React.FC<IcolorPanel> = (props) => {
  const {change, areas, lable, fontIcon} = props
  const [selectColor, setColor] = React.useState('#000')
  const colorLable = (
    <span className={style.lable}>
      <span className="iconfont" dangerouslySetInnerHTML={{__html: `${fontIcon}`}} />
      <em style={{backgroundColor: selectColor}} />
    </span>)
  return (
    <Select
      className="tooltip"
      initValue="#000000"
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
                      setv(colorHex)
                      setColor(colorHex)
                      e.preventDefault()
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

