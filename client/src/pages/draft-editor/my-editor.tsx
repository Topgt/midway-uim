import React from 'react'
import { 
  Editor, 
  EditorState, 
  SelectionState, 
  RichUtils, 
  ContentBlock,
  Modifier,
  DefaultDraftBlockRenderMap
} from 'draft-js'
import {Map} from 'immutable'
import {customStyleMap, blockRenderMap} from './config'
import {IMyEditor, IeditoRef} from './index.d'

const MyEditor: React.FC<IMyEditor> = (props) => {
  const {ederiotRef, editorState, setEditorState, onChange, event, stack} = props
  const editorRef = React.useRef((null as IeditoRef))
  // 解决闭包内拿不到最新editorState
  const stateRef = React.useRef(editorState)
  React.useEffect(() => {
    stateRef.current = editorState
  }, [editorState])

  React.useEffect(() => {
    // 初始化栈的editorState
    stack.push(editorState)
  }, [])

  // 注册事件监听
  React.useEffect(() => {
    event.on('toggleInlineStyle', style => {
      const newState = RichUtils.toggleInlineStyle(stateRef.current, (style as string))
      // console.log(newState.toJS())
      setEditorState(newState)
      return newState
    })
    event.on('toggleBlockType', blockType => {
      const newState = RichUtils.toggleBlockType(stateRef.current, (blockType as string))
      setEditorState(newState)
      return newState
    })
    event.on('changeEditorState', action => {
      // 原生的 撤销和重做栈不完整，会有操作不入栈的情况，
      // 分别对对内容改变，和变更样式的经过入栈，自己管理撤销和重做栈
      if ((action as any)  === 'undo') {
        const state = stack.undo()
        state && setEditorState((state as EditorState))
        // setEditorState(EditorState.undo(stateRef.current))
      } else if ((action as any)  === 'redo') {
        const state = stack.redo()
        state && setEditorState((state as EditorState))
        // setEditorState(EditorState.redo(stateRef.current))
      }
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

    event.fireFinish((eventName:string, params:any[], result:EditorState) => {
      if (!['changeEditorState'].includes(eventName) && result) {
        stack.push(result)
      }
    })
  }, [])

  const change = (state: EditorState) => {
    const oldText = editorState.getCurrentContent().getPlainText()        
    const newText = state.getCurrentContent().getPlainText()
    // console.log(convertToRaw(editorState.getCurrentContent()))
    setEditorState(state)
    if(newText !== oldText){       
      typeof onChange === 'function' && onChange(state)
      stack.push(state)
    }
  }

  // 每次变化都会调用，根据不同的key添加不同的className
  const blockStyleFn = (contentBlock: ContentBlock) => {
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
        // height: 'calc(100% - 35px)',
        padding: '10px 20px'
      }}
      onClick={(e) => {
      // onMouseDown={(e) => {
        // activeElement 属性返回文档中当前获得焦点的元素。
        // e.preventDefault()
        const contentEditable = (document.activeElement as any).contentEditable
        if(contentEditable !== 'true') {
          // setEditorState(moveSelectionToEnd(editorState))
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
