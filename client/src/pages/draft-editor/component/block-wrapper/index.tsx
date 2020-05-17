import React, { Children } from 'react'
import _ from 'lodash'
import { CharacterMetadata, ContentBlock } from 'draft-js'

// 去除ContentBlock 中的inlineStyle 样式
// 删除正则匹配的样式
const removeInlineStyle:(contentBlock: ContentBlock, rule: RegExp)=>ContentBlock = (contentBlock, rule) => {
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

// 多个可兼容的block样式的组合处理
const BlockWrapper = (props: any) => {
  return (
    <React.Fragment>
      {
        React.Children.map(props.children, (target, i) => {
          const targetChildren = _.get(target, 'props.children', {})
          const block = _.get(targetChildren, 'props.block', {})
          // console.log(target)
          const style = block.data.toJS() || {}
          
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(target.type) ) {
            // 去除 字体大小的样式
            const newChildren = React.Children.map(targetChildren, (child, i) => {
              const contentState = _.get(child, 'props.contentState', {})
              const key = _.get(child, 'key', '')
              const block = _.get(child, 'props.block', {})
              const contentBlock = contentState.getBlockForKey(key)

              const newBlock = removeInlineStyle(block, /^\d{1,2}px$/) // 正则匹配合适的样式进行删除
              const newContentBlock = removeInlineStyle(contentBlock, /^\d{1,2}px$/)

              const blockMap = contentState.get('blockMap')
              const nweBlockMap = blockMap.set(key, newContentBlock)
              return React.cloneElement(child, {block: newBlock, contentState:  contentState.set('blockMap', nweBlockMap)})
            })
            return React.createElement(target.type, { style: style, key: i }, newChildren)
          }

          return React.cloneElement(target, { style: style, key: i })
        })
      }
    </React.Fragment>
  )
}

export default BlockWrapper
