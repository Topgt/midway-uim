
export interface Loading {
  global: boolean
  effects: { [key: string]: boolean | undefined }
  models: {
    global?: boolean
    menu?: boolean
    setting?: boolean
    user?: boolean
  }
}

export interface ConnectState {
  loading: Loading
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string
  payload?: P
  callback?: C
  [key: string]: any
}) => any
