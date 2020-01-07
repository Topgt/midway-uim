import React from 'react'
import Immutable from 'immutable'
import style from './style.less'
import {
  Editor, 
  EditorState, 
  RichUtils, 
  SelectionState, 
  DefaultDraftBlockRenderMap,
  convertFromHTML,
  ContentState
} from 'draft-js'

type IeditoRef = Editor | null

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

class MyCustomBlock extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className='MyCustomBlock'>
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'header-two': {
    element: 'h2',
    aliasedElements: ['p'],
  },
  'section': {
    element: 'section',
    wrapper: <MyCustomBlock />,
  },
  'center': {
      element: 'div',
  },
})

const DraftEditor: React.FC<{}> = () => {
  
  const sampleMarkup =
  `<b>Bold text</b>, <i>Italic text</i><br/ >
  <p>Example link</p>`

  const blocksFromHTML = convertFromHTML(sampleMarkup)
  const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap,
);
  const defaultState = EditorState.createWithContent(state)
  const [editorState, setEditorState] = React.useState(defaultState)
  const editorRef = React.useRef((null as IeditoRef))

  const toggleInlineStyle = (style: string) => {
    let state = RichUtils.toggleInlineStyle(editorState, style)
    setEditorState(state)
  }

  const moveSelectionToEnd = (editorState: EditorState) => {
    const content = editorState.getCurrentContent()
    const blockMap = content.getBlockMap()
    const key = blockMap.last().getKey()
    const length = blockMap.last().getLength()
    const selection = new SelectionState({
      anchorKey: key,
      anchorOffset: length,
      focusKey: key,
      focusOffset: length,
    })
    return EditorState.acceptSelection(editorState, selection)
  }

  return (
    <React.Fragment>
      <div className={style.editorToolbar}>
        {defaultInlineStyle.map(item =>
          <button onClick={() => toggleInlineStyle(item.style)} key={item.style}>
            {item.el}
          </button>)}
        <button 
          onClick={() => {
            const blockType = 'section'
            const state = RichUtils.toggleBlockType(editorState, blockType)
            setEditorState(state)
          }}
        >
        toggleBlockType
        </button>  
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
            })
          }
        }}
      >
        <Editor
          ref={ref => editorRef.current = ref}
          editorState={editorState}
          customStyleMap={customStyleMap}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          onChange={(state) => {
            setEditorState(state)
          }}
        />
      </div>
      
    </React.Fragment>
  )
}

export default DraftEditor
