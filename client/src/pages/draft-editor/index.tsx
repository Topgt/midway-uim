import React from 'react'
import {EditorState, RichUtils} from 'draft-js'
import MyEvent from '../../utils/events'
import MyEditor from './my-editor'
import ToolBar from './tool-bar'
import {IMyEditor, IToolBar, IeditoRef} from './index.d'

const Index: React.FC<{}> = () => {
  const state = EditorState.createEmpty()
  const [editorState, setEditorState] = React.useState(state)
  const editorRef = React.useRef((null as IeditoRef))
  const eventRef = React.useRef(new MyEvent())

  const toolBarProps:IToolBar = {
    event: eventRef.current,
  }

  const editorProps: IMyEditor = {
    event: eventRef.current,
    ederiotRef: (editor) => editorRef.current = editor,
    editorState,
    setEditorState
  }
  return (
    <div
      style={{padding: '0 60px', height: '100%'}}
    >
      <ToolBar {...toolBarProps} />
      <MyEditor {...editorProps}/>
    </div>)
}

export default Index
