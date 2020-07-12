import {
  EditorState, 
  SelectionState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  Modifier
} from 'draft-js'
import {OrderedSet, List} from 'immutable'

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

const removeBlockStyle:(contentBlock: ContentBlock, rule: RegExp)=>ContentBlock = (contentBlock, rule) => {
  const characterList = contentBlock.getCharacterList()
  const nweCharacterList = characterList.map((character:any) => {
    const inlineStyle = character?.getStyle()
    let newCharacter = character
    inlineStyle?.forEach((style: string) => {
      if (!!character && !!style && rule.test(style)) {
        newCharacter = CharacterMetadata.removeStyle(newCharacter, style)
      }
    })
    return newCharacter
  })
  const newContentBlock =  contentBlock.set('characterList', nweCharacterList)
  return (newContentBlock as ContentBlock)
}

const removeInlineStyle = (editorState: EditorState, rule: RegExp) => {
  let inlineStyles: string[] = []
  const contentState = editorState.getCurrentContent()
  const selectState = editorState.getSelection()
  const startKey = selectState.getStartKey()
  const endKey = selectState.getEndKey()
  let key
  while(key !== endKey && key !== null) {
    key = contentState.getKeyAfter(key || startKey)
    const block = contentState.getBlockForKey(key || startKey)
    const list = block.getCharacterList()
    list.forEach(d => {
      inlineStyles.push(...d?.getStyle().toJS())
    })
  } 

  inlineStyles = [...new Set(inlineStyles)]
  let newContentState = contentState
  inlineStyles.forEach(
    ss => newContentState = rule.test(ss) ? Modifier.removeInlineStyle(newContentState, selectState, ss) : newContentState
  )
  return EditorState.push(editorState, newContentState, 'change-inline-style')
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

export {
  moveSelectionToEnd,
  removeInlineStyle,
  removeBlockStyle,
  insertText
}
