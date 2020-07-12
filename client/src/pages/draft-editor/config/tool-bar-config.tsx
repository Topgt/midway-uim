import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import BlockWrapper from '../component/block-wrapper'

export type IareasValue = {value: string | string[], fontIcon?: string, lable?: string}[]
export interface Iarea {
  action: string
  type: string
  initValue?: string
  lable?: string
  fontIcon?: string
  areas: IareasValue
}
export type Iareas = Iarea | Iarea[]
export interface ItoolbarArea {
  map(arg0: (toolbarArea: any, idx: any) => JSX.Element): React.ReactNode
  [i: number]: Iareas
}

// 自定义块状样式的定义，使用toggleInlineStyle更换不同的key
const blockRenderMap = Immutable.Map({
  'unstyled': { // blockType, contentBlock.type
    element: 'div',  // 行标签
    wrapper: <BlockWrapper />,
    // 当Draft解析粘贴的HTML时，它将从HTML元素映射回Draft块类型。如果要指定映射到特定块类型的其他HTML元素，则可以添加aliasedElements数组中。
    aliasedElements: ['p'],
  },
  'header-one': {
    element: 'h1',
    wrapper: <BlockWrapper />
  },
  'header-two': {
    element: 'h2',
    wrapper: <BlockWrapper />
  },
  'header-three': {
    element: 'h3',
    wrapper: <BlockWrapper />
  },
  'header-four': {
    element: 'h4',
    wrapper: <BlockWrapper />
  },
  'header-five': {
    element: 'h5',
    wrapper: <BlockWrapper />
  },
  'header-six': {
    element: 'h6',
    wrapper: <BlockWrapper />
  },
})

// 配色面板的颜色
const colors: IareasValue = [
  {
    value: [
      '#000000', '#262626',
      '#595959', '#8c8c8c',
      '#bfbfbf', '#d9d9d9',
      '#e9e9e9', '#f5f5f5',
      '#fafafa', '#ffffff'
    ]
  },
  {
    value: [
      '#f5222d', '#fa541c',
      '#fa8c16', '#fadb14',
      '#52c41a', '#13c2c2',
      '#1890ff', '#2f54eb',
      '#722ed1', '#eb2f96'
    ]
  },
  {
    value: [
      '#ffe8e6', '#ffece0',
      '#ffefd1', '#fff8bd',
      '#e4f7d2', '#d3f5f0',
      '#d4eefc', '#dee8fc',
      '#efe1fa', '#fae1eb'
    ]
  },
  {
    value: [
      '#ffa39e', '#ffbb96',
      '#ffd591', '#fff08f',
      '#b7eb8f', '#87e8de',
      '#91d5ff', '#adc6ff',
      '#d3adf7', '#ffadd2'
    ]
  },
  {
    value: [
      '#ff4d4f', '#ff7a45',
      '#ffa940', '#ffec3d',
      '#73d13d', '#36cfc9',
      '#40a9ff', '#127ef7',
      '#9254de', '#f759ab'
    ]
  },
  {
    value: [
      '#cf1322', '#d4380d',
      '#d46b08', '#d4b106',
      '#389e0d', '#08979c',
      '#096dd9', '#1d39c4',
      '#531dab', '#c41d7f'
    ]
  },
  {
    value: [
      '#820014', '#871400',
      '#873800', '#614700',
      '#135200', '#00474f',
      '#003a8c', '#061178',
      '#22075e', '#780650'
    ]
  }
]

// tool-bar 配置
export const toolbarArea: ItoolbarArea = [
  {
    action: 'changeEditorState',
    type: 'bnt',
    areas: [
      {lable: '保存', fontIcon: '&#xe6fe;', value: 'seve'},
      {lable: '撤销', fontIcon: '&#xe629;', value: 'undo'},
      {lable: '重做', fontIcon: '&#xe62a;', value: 'redo'}
    ]
  }, {
    action: 'format',
    type: 'bnt',
    areas: [
      {lable: '格式刷', fontIcon: '&#xe617;', value: '12'},
      {lable: '清除格式', fontIcon: '&#xe65b;', value: '23'},
    ]
  }, [{
    action: 'toggleBlockType',
    type: 'select',
    initValue: 'unstyled',
    lable: '文本和标题',
    areas: [
      {fontIcon: '', lable: '<div style="margin: 0; display: inline-block; min-width: 120px;">正文</div>', value: 'unstyled'},
      {fontIcon: '', lable: '<h1 style="margin: 0; display: inline-block; min-width: 120px;">标题 1</h1>', value: 'header-one'},
      {fontIcon: '', lable: '<h2 style="margin: 0; display: inline-block; min-width: 120px;">标题 2</h2>', value: 'header-two'},
      {fontIcon: '', lable: '<h3 style="margin: 0; display: inline-block; min-width: 120px;">标题 3</h3>', value: 'header-three'},
      {fontIcon: '', lable: '<h4 style="margin: 0; display: inline-block; min-width: 120px;">标题 4</h4>', value: 'header-four'},
      {fontIcon: '', lable: '<h5 style="margin: 0; display: inline-block; min-width: 120px;">标题 5</h4>', value: 'header-five'},
      {fontIcon: '', lable: '<h6 style="margin: 0; display: inline-block; min-width: 120px;">标题 6</h4>', value: 'header-six'},
    ]
  }, {
    action: 'toggleInlineStyle',
    type: 'select',
    initValue: '12px',
    lable: '字号',
    areas: [
      {lable: '12px', fontIcon: '', value: '12px'},
      {lable: '13px', fontIcon: '', value: '13px'},
      {lable: '14px', fontIcon: '', value: '14px'},
      {lable: '15px', fontIcon: '', value: '15px'},
      {lable: '16px', fontIcon: '', value: '16px'},
      {lable: '19px', fontIcon: '', value: '19px'},
      {lable: '22px', fontIcon: '', value: '22px'},
      {lable: '24px', fontIcon: '', value: '24px'},
      {lable: '29px', fontIcon: '', value: '29px'},
      {lable: '32px', fontIcon: '', value: '32px'},
      {lable: '40px', fontIcon: '', value: '40px'},
      {lable: '48px', fontIcon: '', value: '48px'},
    ]
  }], {
    action: 'addBlockType',
    type: 'select',
    initValue: JSON.stringify({textAlign: 'left'}),
    lable: '对齐方式',
    areas: [
      {lable: '左对齐', fontIcon: '&#xe6cf;', value: JSON.stringify({textAlign: 'left'})},
      {lable: '居中对齐', fontIcon: '&#xe73e;', value: JSON.stringify({textAlign: 'center'})},
      {lable: '右对齐', fontIcon: '&#xe6cd;', value: JSON.stringify({textAlign: 'right'})},
    ]
  }, {
    action: 'toggleInlineStyle',
    type: 'bnt',
    areas: [
      {lable: '加粗', fontIcon: '&#xe660;', value: 'BOLD'},
      {lable: '斜体', fontIcon: '&#xe700;', value: 'ITALIC'},
      {lable: '删除线', fontIcon: '&#xe664;', value: 'STRIKETHROUGH'},
      {lable: '下划线', fontIcon: '&#xe701;', value: 'UNDERLINE'},
      {lable: '更多文本样式', fontIcon: '&#xe632;', value: 'dd'},
    ]
  }, [{
    action: 'toggleInlineStyle',
    type: 'color',
    initValue: '#000000',
    lable: '字体颜色',
    fontIcon: '&#xe601;',
    areas: colors
  }, {
    action: 'toggleInlineStyle',
    type: 'background',
    initValue: '#ffffff',
    lable: '背景色',
    fontIcon: '&#xe6f8;',
    areas: colors
  }]
]

// 自定义行内样式的定义，使用toggleInlineStyle更换不同的key
const customStyleMap: {[key:string]: {[key: string]: string}} = {
  '12px': {fontSize: '12px'},
  '13px': {fontSize: '13px'},
  '14px': {fontSize: '14px'},
  '15px': {fontSize: '15px'},
  '16px': {fontSize: '16px'},
  '19px': {fontSize: '19px'},
  '22px': {fontSize: '22px'},
  '24px': {fontSize: '24px'},
  '29px': {fontSize: '29px'},
  '32px': {fontSize: '32px'},
  '40px': {fontSize: '40px'},
  '48px': {fontSize: '48px'},
}

colors.forEach(({value}) => {
  (value as string[]).forEach(s => {
    customStyleMap[`color-${s}`] = {color: s}
    customStyleMap[`background-${s}`] = {background: s}
  })
})

export {customStyleMap, blockRenderMap}
