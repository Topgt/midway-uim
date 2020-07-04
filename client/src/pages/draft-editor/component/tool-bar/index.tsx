import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import Select from '../select'
import ColorPanel from '../color-panel'
import {IToolBar} from './index.d'
import style from './style.less'
import {toolbarArea, Iarea} from '../../config'

const ToolBar: React.FC<IToolBar> = (props) => {
  const { event, editorState } = props

  const inlineStyles = editorState.getCurrentInlineStyle().toJS()
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const renderBtn: (i: Iarea['areas'][0], a: string, k: number | string, disabled?: boolean) => React.ReactNode = (inlineStyle, action, key, disabled) => (
    <button
      key={key}
      disabled={disabled}
      className={classnames({tooltip: !disabled})}
      active={inlineStyles.includes(inlineStyle.value) ? 'true' : 'false'}
      tooltip={inlineStyle.lable}
      onMouseDown={e => {
        e.preventDefault()
        event.fire(`${action}`, inlineStyle.value)
      }}
    >
      <div 
        className="iconfont"
        dangerouslySetInnerHTML={{__html: `${inlineStyle.fontIcon}`}} 
      />
    </button>
  )
  const renderToolbarArea: (t: Iarea, idx: number | string)=>React.ReactNode = (area, key) => {
    let disabled = false
    const {action, type, areas, initValue, lable, fontIcon} = area
    let currentValue = undefined
    if (lable === '文本和标题') {
      currentValue = blockType
    } if (lable === '字号') {
      disabled = ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six'].includes(blockType)
      currentValue = _.findLast(inlineStyles, style => /^\d{1,2}px$/.test(style))
      // console.log(currentValue, initValue)
    }

    switch(type) {
      case 'bnt':
        return areas.map((ilns, idx) => renderBtn(ilns, action, `${key}-${idx}`))
      case 'select':
        return (
          <Select 
            disabled={disabled}
            className={classnames({tooltip: !disabled})}
            key={key}
            onChange={(style: string) => event.fire(`${action}`, style)}
            initValue={initValue}
            value={currentValue}
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
                          if (value !== v) {
                            setV((value as string))
                          }
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
      case 'background':
        return (
          <ColorPanel
            key={key}
            disabled={disabled}
            initValue={initValue}
            change={(s) => event.fire(`${action}`, `${type}-${s}`)}
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
