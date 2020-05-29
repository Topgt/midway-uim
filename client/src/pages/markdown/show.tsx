import React, {useState} from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import style from './index.less'
import { any, array } from 'prop-types';

interface IanchorNav {
  name: string
  level: number
  childern: IanchorNav[]
  parent: IanchorNav[]
}

interface Iprops {
  content: string
}

const Md: React.FC<Iprops> = ({content=''}) => {

  const anchorNav:any = []

  const reduxAnchor = (result: IanchorNav[]) => {
    const findInsertion = (parentNode:any, level: number): any => {
      if (parentNode.parent[0].level === 0 ) {
        return result
      }
      if (parentNode.parent[0].level === level) {
        return parentNode.parent
      } else if (parentNode.parent[0].level > level) {
        return findInsertion(parentNode.parent[0], level)
      }
    }

    let parentNode: IanchorNav = {name: anchorNav[0].name, level: 0, childern: [], parent: result}
    void (anchorNav as IanchorNav[]).reduce((r: IanchorNav[], node: IanchorNav)=> {
      const {name, level} = node
      const {level: parentLevel} = parentNode
      const newNode = {name, level, childern: [], parent: r}
      if (r.length === 0) {
        r.push(newNode)
        return r
      } else if (level === parentLevel) {
        r.push(newNode)
        parentNode = newNode
        return r
      } else if (!!parentLevel && level > parentLevel) {
        const {childern} = parentNode
        childern.push(newNode)
        parentNode = newNode
        return childern
      } else {
        const insertion = findInsertion(parentNode, level)
        void (insertion as IanchorNav[]).push(newNode)
        parentNode = newNode
        return insertion
      }

    }, result)
  }

  const renderer = new marked.Renderer()
  renderer.heading = function (text, level) {
    anchorNav.push({
      name: text,
      level
    })
    return  `<h${level}>
                <a name=${text} style="position: relative;top: -80px;"></a>
                <span>${text}</span>
            </h${level}>`
  },

  marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
  })

  const html = marked(content)

  const rl: IanchorNav[] = []
  if (anchorNav.length) {
    reduxAnchor(rl)
  }

  const rendAnchorNode = (data: IanchorNav):any => {
    const {name, childern} = data
    if ((childern as IanchorNav[]).length) {
      return (
        <li key={name}><a href={`#${name}`}>{name}</a>
          <ul>
            {
              (childern as IanchorNav[]).map((item: IanchorNav) => {
                return rendAnchorNode(item)
              })
            }
          </ul>
        </li>
      )
    } else {
      return (<li key={name}><a href={`#${name}`}>{name}</a></li>)
    }
  }

  return (
    <div>
      <nav className={style.tocContainer}>
        <ul>
          {
            rl.map((item: IanchorNav) => {
              return rendAnchorNode(item)
            })
          }
        </ul>
      </nav>
      <div
        className={style.content}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    </div>
  )
}

export default Md
