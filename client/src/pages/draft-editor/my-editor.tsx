import React from 'react'
import { 
  Editor, 
  EditorState, 
  SelectionState, 
  RichUtils, 
  ContentBlock,
  convertToRaw,
  Modifier,
  DefaultDraftBlockRenderMap 
} from 'draft-js'
import {Map} from 'immutable'
import {customStyleMap, blockRenderMap} from './config'
import {IMyEditor, IeditoRef} from './index.d'

const MyEditor: React.FC<IMyEditor> = (props) => {
  const {ederiotRef, editorState, setEditorState, onChange, event} = props
  const editorRef = React.useRef((null as IeditoRef))

  // 解决闭包内拿不到最新editorState
  const stateRef = React.useRef(editorState)
  React.useEffect(() => {
    stateRef.current = editorState
  }, [editorState])

  React.useEffect(() => {
    event.on('toggleInlineStyle', style => {
      setEditorState(RichUtils.toggleInlineStyle(stateRef.current, (style as any)))
    })
    event.on('toggleBlockType', blockType => {
      setEditorState(RichUtils.toggleBlockType(stateRef.current, (blockType as any)))
    })
    event.on('addBlockType', blockType => {
      const currentContentState = stateRef.current.getCurrentContent()
      const selectState = stateRef.current.getSelection()
      const key = selectState.getStartKey()
      const data = currentContentState.getBlockForKey(key).getData()
      const style = Map(JSON.parse((blockType as any)))
      style.merge(data.toJS())
      const contentState = Modifier.setBlockData(currentContentState, selectState, style.toJS())
      const state = EditorState.createWithContent(contentState)
      setEditorState(state)
    })
  }, [])

  const change = (state: EditorState) => {
    const oldText = editorState.getCurrentContent().getPlainText()        
    const newText = state.getCurrentContent().getPlainText()
    // console.log(convertToRaw(editorState.getCurrentContent()))
    setEditorState(state)
    if(newText !== oldText){            
      typeof onChange === 'function' && onChange(state)
    }
  }

  // 每次变化都会调用，根据不同的key添加不同的className
  const blockStyleFn = (contentBlock: ContentBlock) => {
    // const type = contentBlock.getType()
    // const metaData = contentBlock.getData()
    // const styleAttributes = Object.keys(metaData.toJS()).map(key => {
    //   return `${key.replace(/[A-Z]/g, match => `-${match.toLocaleLowerCase()}`)}: ${metaData.get(key)}`
    // })
    // let className = ''
    // if(contentBlock.getType() === 'header-two') {
    //   className = 'myclass'
    // }
    return ''
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
