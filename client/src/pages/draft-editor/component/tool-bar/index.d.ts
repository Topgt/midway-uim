import { EditorState } from 'draft-js'
import {Events} from '../../../../utils/index'

interface IToolBar {
  editorState: EditorState
  event: Events
}

export {
  IToolBar,
}
