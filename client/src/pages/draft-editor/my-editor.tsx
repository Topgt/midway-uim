import React from 'react'
import { 
  Editor, 
  EditorState, 
  SelectionState, 
  RichUtils, 
  ContentBlock,
  Modifier,
  DefaultDraftBlockRenderMap,
  convertToRaw
} from 'draft-js'
import {Map, OrderedSet} from 'immutable'
import {customStyleMap, blockRenderMap} from './config/tool-bar-config'
import {IMyEditor, IeditoRef} from './index.d'
import './style.less'

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

const insertText = (editorState: EditorState, text='‎',  styles: string[]) => {
  const inlineStyles:string[] = editorState.getCurrentInlineStyle().toJS()
  const contentState = editorState.getCurrentContent()
  const selectState = editorState.getSelection()
  let draftInlineStyle = OrderedSet<string>(inlineStyles)
  styles.forEach(
    ss => draftInlineStyle = draftInlineStyle.has(ss) ? draftInlineStyle.delete(ss) : draftInlineStyle.add(ss)
  )
  const newContentState = Modifier.insertText(contentState, selectState, text, draftInlineStyle)
  let nextState = EditorState.createWithContent(newContentState)

  const key = selectState.getAnchorKey()
  const length = selectState.getFocusOffset() + text.length
  const nextSelectState = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  })
  nextState = EditorState.acceptSelection(nextState, nextSelectState)

  return nextState
}

const MyEditor: React.FC<IMyEditor> = (props) => {
  const {ederiotRef, editorState, setEditorState, onChange, event, stack} = props
  const editorRef = React.useRef((null as IeditoRef))
  // 解决闭包内拿不到最新editorState
  const stateRef = React.useRef(editorState)
  React.useEffect(() => {
    stateRef.current = editorState
  }, [editorState])

  // 注册事件监听
  React.useEffect(() => {
    event.on('toggleInlineStyle', style => {
      const selectState = stateRef.current.getSelection()
      // 如何没有选择文字就设置样式，先插入一个看不见的字符应用该样式。这是为了解决先设置样式再输入中文样式会丢失的问题
      if ((selectState.getEndOffset()-selectState.getStartOffset()) === 0) {
        // 注意，这并不少一个空字符串，这个字符串中包含了一个在html中不显示的&lrm;
        const state = insertText(stateRef.current, '‎',  [style])
        setEditorState(state)
        setTimeout(() => {
          editorRef.current && editorRef.current.focus()
        })
        return state
      }
      const newState = RichUtils.toggleInlineStyle(stateRef.current, (style as string))
      setEditorState(newState)
      return newState
    })
    event.on('toggleBlockType', blockType => {
      const newState = RichUtils.toggleBlockType(stateRef.current, (blockType as string))
      setEditorState(newState)
      return newState
    })
    event.on('changeEditorState', (action: string) => {
      // 原生的 撤销和重做栈不完整，会有操作不入栈的情况，
      // 分别对对内容改变，和变更样式的经过入栈，自己管理撤销和重做栈
      if (action === 'undo') {
        const state = stack.undo()
        state && setEditorState((state as EditorState))
      } else if (action === 'redo') {
        const state = stack.redo()
        state && setEditorState((state as EditorState))
      } else if (action === 'seve') {
        const contentState = stateRef.current.getCurrentContent()
        const json = convertToRaw(contentState)
        // console.log(json)
      }
    })
    event.on('addBlockType', (blockType: any) => {
      const currentContentState = stateRef.current.getCurrentContent()
      const selectState = stateRef.current.getSelection()
      const blockData = Map(JSON.parse(blockType))
      const contentState = Modifier.mergeBlockData(currentContentState, selectState, blockData)
      let state = EditorState.createWithContent(contentState)
      state = EditorState.acceptSelection(state, selectState)
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

  return (
    <div
      style={{
        border: '1px solid #ccc',
        // height: 'calc(100% - 35px)',
        padding: '10px 20px'
      }}
      onClick={(e) => {
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
