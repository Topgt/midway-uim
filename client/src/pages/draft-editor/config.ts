import Immutable from 'immutable'

// 自定义块状样式的定义，使用toggleInlineStyle更换不同的key
export const blockRenderMap = Immutable.Map({
  'header-two': { // blockType, contentBlock.type
    element: 'h2',  // 行标签
    aliasedElements: ['p'],
  },
  'section': {
    element: 'section', 
    // wrapper: <MyCustomBlock />, //自定义 block
  },
  'center': {
      element: 'div',
  },
})

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
    action: 'toggleInlineStyle',
    type: 'bnt',
    areas: [
      {lable: '保存', fontIcon: '&#xe6fe;', value: 'UNDERLINE'},
      {lable: '撤销', fontIcon: '&#xe629;', value: 'BOLD'},
      {lable: '重做', fontIcon: '&#xe62a;', value: 'ITALIC'},
      {lable: '格式刷', fontIcon: '&#xe617;', value: 'STRIKETHROUGH'},
      {lable: '清除格式', fontIcon: '&#xe65b;', value: 'STRIKETHROUGH'},
    ]
  }, [{
    action: 'toggleInlineStyle',
    type: 'select',
    initValue: '1',
    lable: '文本和标题',
    areas: [
      {fontIcon: '', lable: '<div style="margin: 0; display: inline-block; min-width: 120px;">正文</div>', value: '1'},
      {fontIcon: '', lable: '<h1 style="margin: 0; display: inline-block; min-width: 120px;">标题 1</h1>', value: '2'},
      {fontIcon: '', lable: '<h2 style="margin: 0; display: inline-block; min-width: 120px;">标题 2</h2>', value: '3'},
      {fontIcon: '', lable: '<h3 style="margin: 0; display: inline-block; min-width: 120px;">标题 3</h3>', value: '4'},
      {fontIcon: '', lable: '<h4 style="margin: 0; display: inline-block; min-width: 120px;">标题 4</h4>', value: '5'},
    ]
  }, {
    action: 'toggleInlineStyle',
    type: 'select',
    initValue: '1',
    lable: '字号',
    areas: [
      {lable: '12px', fontIcon: '', value: '1'},
      {lable: '13px', fontIcon: '', value: '2'},
      {lable: '14px', fontIcon: '', value: '3'},
      {lable: '15px', fontIcon: '', value: '4'},
      {lable: '16px', fontIcon: '', value: '5'},
      {lable: '19px', fontIcon: '', value: '6'},
      {lable: '22px', fontIcon: '', value: '7'},
      {lable: '24px', fontIcon: '', value: '8'},
      {lable: '29px', fontIcon: '', value: '9'},
      {lable: '32px', fontIcon: '', value: '10'},
      {lable: '40px', fontIcon: '', value: '11'},
      {lable: '48px', fontIcon: '', value: '12'},
    ]
  }], {
    action: 'toggleInlineStyle',
    type: 'select',
    initValue: '1',
    lable: '对齐方式',
    areas: [
      {lable: '右对齐', fontIcon: '&#xe6cd;', value: '1'},
      {lable: '左对齐', fontIcon: '&#xe6cf;', value: '2'},
      {lable: '居中对齐', fontIcon: '&#xe73e;', value: '3'},
    ]
  }, {
    action: 'toggleInlineStyle',
    type: 'bnt',
    areas: [
      {lable: '加粗', fontIcon: '&#xe660;', value: 'BOLD'},
      {lable: '斜体', fontIcon: '&#xe700;', value: 'ITALIC'},
      {lable: '删除线', fontIcon: '&#xe664;', value: 'STRIKETHROUGH'},
      {lable: '下划线', fontIcon: '&#xe701;', value: 'UNDERLINE'},
      {lable: '更多文本样式', fontIcon: '&#xe632;', value: 'UNDERLINE'},
    ]
  }, [{
    action: 'toggleInlineStyle',
    type: 'color',
    initValue: '1',
    lable: '字体颜色',
    fontIcon: '&#xe601;',
    areas: colors
  }, {
    action: 'toggleInlineStyle',
    type: 'color',
    initValue: '1',
    lable: '背景色',
    fontIcon: '&#xe6f8;',
    areas: colors
  }]
]


// 自定义行内样式的定义，使用toggleInlineStyle更换不同的key
const customStyleMap: {[key:string]: {color: string}} = {
  // 'RED': { color: '#e24' },
  // 'BLUE': { color: '#39f' },
  // 'ORANGE': { color: '#f93' },
  // 'GREEN': { color: '#3a6' }
}

colors.forEach(({value}) => {
  (value as string[]).forEach(s => customStyleMap[s] = {color: s})
})

export {customStyleMap}
