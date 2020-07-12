import { EditorState } from 'draft-js'
import {Events, Stack} from '../../../../utils/index'

interface IToolBar {
  stack: Stack<EditorState>
  editorState: EditorState
  event: Events
}

export {
  IToolBar,
}
