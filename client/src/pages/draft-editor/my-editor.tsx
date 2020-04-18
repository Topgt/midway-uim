import React from 'react'
import { 
  Editor, 
  EditorState, 
  SelectionState, 
  RichUtils, 
  ContentBlock,
  DefaultDraftBlockRenderMap 
} from 'draft-js'
import {customStyleMap, blockRenderMap} from './config'
import {IMyEditor, IeditoRef} from './index.d'

const MyEditor: React.FC<IMyEditor> = (props) => {
  const {ederiotRef, editorState, setEditorState, onChange, event} = props
  const editorRef = React.useRef((null as IeditoRef))

  const stateRef = React.useRef(editorState) // 解决闭包内拿不到最新editorState
  React.useEffect(() => {
    stateRef.current = editorState
  }, [editorState])

  React.useEffect(() => {
    event.on('toggleInlineStyle', style => {
      // console.log('fire event', style)
      // 解决闭包内拿不到最新editorState
      setEditorState(RichUtils.toggleInlineStyle(stateRef.current, (style as any)))
    })
  }, [])

  const change = (state: EditorState) => {
    const oldText = editorState.getCurrentContent().getPlainText()        
    const newText = state.getCurrentContent().getPlainText()  
    setEditorState(state)
    if(newText !== oldText){            
      typeof onChange === 'function' && onChange(state)
    }
  }

  // 每次变化都会调用，根据不同的key添加不同的className
  const blockStyleFn = (contentBlock: ContentBlock) => {
    let className = ''
    if(contentBlock.getType() === 'header-two') {
      className = 'myclass'
    }
    return className
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
        customStyleMap={customStyleMap}
        blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
        blockStyleFn={blockStyleFn}
        editorState={editorState}
        onChange={change}
        ref={editor => {
          editorRef.current = editor
          ederiotRef((editor as any))
        }}
      />
    </div>
  )
}

export default MyEditor
