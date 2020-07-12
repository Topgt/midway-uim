import React, {ReactNode} from 'react'
import Option from './option'

export interface IOptionProps {
  lable?: ReactNode
  value?: string
  className?: string
  style?: object
}

export interface ISelect<T> extends React.FC<T> {
  Option: typeof Option
}

export interface ISelectOption {
  className?: string
  disabled?: boolean
  initValue?: string
  value?: string
  tooltip?: string
  lable?: string | React.ReactNode
  automatic?: boolean
  onChange?: (v: string) => void
}
