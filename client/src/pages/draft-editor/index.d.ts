import { Editor, EditorState } from 'draft-js'
import MyEvent from '../../utils/events'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    tabIndex?: number
    tooltip?: string
  }
}

type IeditoRef = Editor | null

interface IMyEditor {
  event: MyEvent
  editorState: EditorState
  setEditorState: (state: EditorState) => void
  ederiotRef: (editor:Editor) => Editor
  onChange?: (state: EditorState) => void
}

interface IToolBar {
  event: MyEvent
}

export {
  IMyEditor,
  IToolBar,
  IeditoRef,
}
