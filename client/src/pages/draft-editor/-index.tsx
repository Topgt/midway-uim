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
  ContentState,
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
      <div className='MyCustomBlock' style={{color: 'red'}}>
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'header-two': { // blockType, contentBlock.type
    element: 'h2',  // 
    aliasedElements: ['p'],
  },
  'kkk': {
    element: 'h1',
    aliasedElements: ['p'],
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
  // const state = ContentState.createFromText(sampleMarkup)
  const defaultState = EditorState.createWithContent(state)
  const [editorState, setEditorState] = React.useState(defaultState)
  const editorRef = React.useRef((null as IeditoRef))

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
          (<button
            key={item.style}
            onMouseDown={(e) => {
              // 点击按钮事件需要使用 onMouseDown ，
              // 并且在触发的函数里开头需要写 e.preventDefault()，这样可以阻止按钮获取到焦点，光标依然保持选中文本的状态。
              e.preventDefault()
              const state = RichUtils.toggleInlineStyle(editorState, item.style)
              setEditorState(state)
              }} 
          >
            {item.el}
          </button>))
        }
        <button 
          onClick={(e) => {
            const blockType = 'kkk'
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
          // activeElement 属性返回文档中当前获得焦点的元素。
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
            const oldText = editorState.getCurrentContent().getPlainText()        
            const newText = state.getCurrentContent().getPlainText()  
            setEditorState(state)
            if(newText !== oldText){            
              // 这里就改装成了一个 原生onchange
              // do something
            }
          }}
          blockStyleFn={contentBlock => {
            let className = ''
            if(contentBlock.getType() === 'header-two') {
              className = 'myclass'
            }
            return className
          }}
        />
      </div>
      
    </React.Fragment>
  )
}

export default DraftEditor
