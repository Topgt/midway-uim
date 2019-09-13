import { Effect, Subscription } from 'dva'
import { Reducer } from 'redux'
import { queryFileContent, downLoad } from '@/services/views-services'

export interface Istat {

}

export interface IModelType {
  namespace: string
  state: Istat
  effects: {
    queryMd?: Effect
    downLoad?: Effect
    editor?: Effect
    delete?: Effect
  }
  reducers: {
    [key: string]: Reducer<Istat>
  }
  subscriptions: {
    setup: Subscription
  }
}


const viewsModel: IModelType =  {
  namespace: 'views',

  state: {
    fileContent: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if ( /^\/about/.test(location.pathname)) {
          dispatch({ type: 'queryMd', playload:{path:'@~/个人简历.md'} })
        }
      })
    },
  },

  effects: {
    *queryMd ({ playload }, { call, put }) {
      const response = yield call(queryFileContent, playload)
      const {result={}, success} = response
      if (`${success}` === 'true') {
        yield put({
          type: 'fileContent',
          playload: {
            fileContent: result.content,
          }
        })
      }
    },

    *downLoad ({playload}, {call}) {
      yield call(downLoad, playload)
    }
  },

  reducers: {
    fileContent (state, action) {
      const { fileContent } = action.playload
      return {
        ...state,
        fileContent,
      }
    }
  },
};

export default viewsModel
