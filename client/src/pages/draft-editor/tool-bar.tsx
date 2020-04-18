import React from 'react'
import Select from './component/select'
import ColorPanel from './component/color-panel'
import {IToolBar} from './index.d'
import style from './style.less'
import {toolbarArea, Iarea} from './config'

const ToolBar: React.FC<IToolBar> = (props) => {
  const { event } = props

  const renderBtn: (i: Iarea['areas'][0], a: string, k: number | string) => React.ReactNode = (inlineStyle, action, key) => (
    <button
      key={key}
      onMouseDown={e => {
        e.preventDefault()
        event.fire(`${action}`, inlineStyle.value)
      }}
    >
      <div 
        className="iconfont tooltip"
        tooltip={inlineStyle.lable}
        dangerouslySetInnerHTML={{__html: `${inlineStyle.fontIcon}`}} 
      />
    </button>
  )
  const renderToolbarArea: (t: Iarea, idx: number | string)=>React.ReactNode = (area, key) => {
    const {action, type, areas, initValue, lable, fontIcon} = area
    switch(type) {
      case 'bnt':
        return areas.map((ilns, idx) => renderBtn(ilns, action, `${key}-${idx}`))
      case 'select':
        return (
          <Select 
            className="tooltip"
            key={key}
            onChange={(style: string) => event.fire(`${action}`, style)}
            initValue={initValue}
            tooltip={lable}
          >
            {
              areas.map(
                ({fontIcon, lable='', value}, i) => (
                  <Select.Option
                    key={`${key}-${i}`}
                    value={(value as string)}
                    lable={
                      fontIcon
                        ? <span className="iconfont" dangerouslySetInnerHTML={{__html: `${fontIcon}`}} />
                        : <span style={{width: '45px', display: 'inline-block'}} dangerouslySetInnerHTML={{__html: lable.replace(/<[^>]+>/g,"")}} />
                    }
                  >{
                    (v: string, setV: (key: string) => void) => (
                      <span
                        onMouseDown={(e) => {
                          e.preventDefault()
                          setV((value as string))
                        }}
                      >
                        <span className="iconfont" dangerouslySetInnerHTML={{__html: `${fontIcon}`}} />
                        <span style={{minWidth: '75px', display: 'inline-block', marginLeft: '8px', verticalAlign: 'middle'}} dangerouslySetInnerHTML={{__html: `${lable}`}} />
                        {
                          v === value
                            ? <span className="iconfont" style={{verticalAlign: 'middle'}}>&#xe61c;</span>
                            : ''
                        }
                      </span>)
                    }
                  </Select.Option>))
              }
          </Select>)
      case 'color':
        return (
          <ColorPanel
            key={key}
            change={(s) => event.fire(`${action}`, s)}
            areas={areas}
            lable={lable}
            fontIcon={fontIcon}
          />)
      default :
        return ''
    }
  }
  return (
    <div
      className={style.editorToolbar}
    >
    {
      toolbarArea.map((toolbarArea, idx) => (
        <div className={style.barArea} key={idx}>
          {
            Array.isArray(toolbarArea)
            ? toolbarArea.map((area, i) => renderToolbarArea(area, `${idx}-${i}`))
            : renderToolbarArea(toolbarArea, idx)
          }
        </div>
      ))
    }
    </div>
  )
}

export default ToolBar
