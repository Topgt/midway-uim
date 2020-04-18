
/**
 * 我可以写一些自定义的东西，但我更喜欢使用开源库，如果有的话。没有找到合适的,先自己写个简单
 * onOne 监听事件一次
 * on  始终监听事件
 * fire 发出一个事件
 * 
 * onOne(eventName, callback)
 * 
 * on(eventName, callback)
 * 
 * fire(eventName, args)
 */

 type funs = (prams?:any[])=>void

class MyEvent {
  private events:{
    [key:string]: funs[]
  } = {};

  public on(evt:string, ...handlers:funs[]) {
    this.events[evt] = this.events[evt] || [];
    this.events[evt].push(...handlers)
  }
      
  public onOne(eventName:string, ...handlers:funs[]) {
    const name = `one-${eventName}`
    this.events[name] = [...handlers]
  }

  public fire(eventName:string, ...args:any[]) {
    const eventNames = Object.keys(this.events)
    if (!eventNames.includes(eventName) && !eventNames.includes(`one-${eventName}`)) {
      console.warn(`${eventName} 事件未定义`)
      return
    }

    if (eventNames.includes(`one-${eventName}`)) {
      this.events[`one-${eventName}`].forEach(handler => typeof handler === 'function' && handler(...args))
    }

    this.events[eventName].forEach(handler => typeof handler === 'function' && handler(...args))
  }
}

export default MyEvent
  
