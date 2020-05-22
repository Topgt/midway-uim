
/**
 * 我可以写一些自定义的东西，但我更喜欢使用开源库，如果有的话。没有找到合适的,先自己写个简单
 * onOne 监听事件一次
 * on  始终监听事件
 * fire 发出一个事件
 * fireFinish 所有监听的事件执行完成后调用该方法监听的参数，参数回调有三个参数，事件名称，事件执行的参数数组，事件执行返回的结果
 * 
 * onOne(eventName, callback)
 * 
 * on(eventName, callback)
 * 
 * fireFinish((eventName, params, result)=>{})
 * 
 * fire(eventName, args)
 */

 type funs = (...args: any[])=>void

class MyEvent {
  private events:{
    [key:string]: funs[]
  } = {};
  private finishs: funs[] = []

  public on(evt:string, ...handlers:funs[]) {
    this.events[evt] = this.events[evt] || [];
    this.events[evt].push(...handlers)
  }
      
  public onOne(eventName:string, ...handlers:funs[]) {
    const name = `one-${eventName}`
    this.events[name] = [...handlers]
  }

  public fireFinish (handler: funs) {
    this.finishs.push(handler)
  }
  
  private working (eventName: string, params: any[], handler: funs) {
    const result = typeof handler === 'function' && handler(...params)
    this.finishs.forEach(handler => typeof handler === 'function' && handler(eventName, params, result))
  }

  public fire(eventName:string, ...args:any[]) {
    const eventNames = Object.keys(this.events)
    if (!eventNames.includes(eventName) && !eventNames.includes(`one-${eventName}`)) {
      // console.warn(`${eventName} 事件未定义`)
      return
    }

    if (eventNames.includes(`one-${eventName}`)) {
      this.events[`one-${eventName}`].forEach(handler => this.working(eventName, args, handler))
    }
    this.events[eventName].forEach(handler => this.working(eventName, args, handler))
    
  }
}


export default MyEvent
  
