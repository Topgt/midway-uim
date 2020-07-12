import React, { Children } from 'react'
import _ from 'lodash'
import { CharacterMetadata, ContentBlock } from 'draft-js'
import {removeBlockStyle as removeInlineStyle} from '../../../../utils'

// 多个可兼容的block样式的组合处理
const BlockWrapper = (props: any) => {
  return (
    <React.Fragment>
      {
        React.Children.map(props.children, (target, i) => {
          const targetChildren = _.get(target, 'props.children', {})
          const block = _.get(targetChildren, 'props.block', {})
          // console.log(block.toJS())
          const style = block.data.toJS() || {}
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(target.type) ) {
            // 去除 字体大小的样式
            const newChildren = React.Children.map(targetChildren, (child, i) => {
              const block = _.get(child, 'props.block', {})
              // 去除ContentBlock 中的inlineStyle 样式, 删除正则匹配的样式
              const newBlock = removeInlineStyle(block, /^\d{1,2}px$/) // 正则匹配合适的样式进行删除
              return React.cloneElement(child, {block: newBlock})
            })
            return React.cloneElement(target, { style: style, key: i, children:  newChildren})
          }

          return React.cloneElement(target, { style: style, key: i })
        })
      }
    </React.Fragment>
  )
}

export default BlockWrapper
