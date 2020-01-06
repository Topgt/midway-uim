import React from 'react'
import {Editor, EditorState, RichUtils, SelectionState} from 'draft-js'
import style from './style.less'
import { any } from 'prop-types'

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

type IeditoRef = Editor | null

const DraftEditor: React.FC<{}> = () => {
  
  const defaultState = EditorState.createEmpty()
  const [editorState, setEditorState] = React.useState(defaultState)
  const editorRef = React.useRef((null as IeditoRef))

  const toggleInlineStyle = (style: string) => {
    let state = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(state);
  }

  const moveSelectionToEnd = (editorState: EditorState) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();
    const selection = new SelectionState({
        anchorKey: key,
        anchorOffset: length,
        focusKey: key,
        focusOffset: length,
    });
    return EditorState.acceptSelection(editorState, selection);
  };

  return (
    <React.Fragment>
      <div className={style.editorToolbar}>
        {defaultInlineStyle.map(item =>
          <button onClick={() => toggleInlineStyle(item.style)} key={item.style}>
            {item.el}
          </button>)}
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          height: 'calc(100% - 35px)',
          padding: '10px 20px'
        }}
        onClick={() => {
          const contentEditable = (document.activeElement as any).contentEditable
          if(contentEditable !== 'true') {
            setEditorState(moveSelectionToEnd(editorState))
            setTimeout(() => {
              editorRef.current && editorRef.current.focus()
            });
          }
        }}
      >
        <Editor
          ref={ref => editorRef.current = ref}
          editorState={editorState}
          customStyleMap={customStyleMap}
          onChange={(state) => {
            // console.log(state)
            setEditorState(state)
          }}
        />
      </div>
      
    </React.Fragment>
  )
}

export default DraftEditor
