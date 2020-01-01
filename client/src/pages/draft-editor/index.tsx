import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'
import style from './style.less'

let defaultInlineStyle = [
  { el: <div style={{ fontWeight: "bold" }}>B</div>, style: 'BOLD' },
  { el: <div style={{ fontStyle: "italic" }}>I</div>, style: 'ITALIC' },
  { el: <div style={{ textDecoration: "underline" }}>U</div>, style: 'UNDERLINE' },
  { el: <div className="color-show" style={{ backgroundColor: '#e24' }} />, style: 'RED' },
  { el: <div className="color-show" style={{ backgroundColor: '#39f' }} />, style: 'BLUE' },
  { el: <div className="color-show" style={{ backgroundColor: '#f93' }} />, style: 'ORANGE' },
  { el: <div className="color-show" style={{ backgroundColor: '#3a6' }} />, style: 'GREEN' }
]

let customStyleMap = {
  'RED': { color: '#e24' },
  'BLUE': { color: '#39f' },
  'ORANGE': { color: '#f93' },
  'GREEN': { color: '#3a6' }
}

const DraftEditor: React.FC<{}> = () => {
  
  const defaultState = EditorState.createEmpty()
  const [editorState, setEditorState] = React.useState(defaultState)

  const toggleInlineStyle = (style: string) => {
    let state = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(state);
}
  return (
    <React.Fragment>
      <div className={style.editorToolbar}>
        {defaultInlineStyle.map(item =>
          <button onClick={() => toggleInlineStyle(item.style)} key={item.style}>
            {item.el}
          </button>)}
      </div>
      <Editor
        editorState={editorState}
        customStyleMap={customStyleMap}
        onChange={(state) => {
          // console.log(state)
          setEditorState(state)
        }}
      />
    </React.Fragment>
  )
}

export default DraftEditor
