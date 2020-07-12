// 严格来说它并不是一个循环栈，因为他会忽略第一个栈顶元素
class Stack<T> {
  private stack: Array<T> = [];
  private cursor: number = 0
  private top: number = 0
  private bottom: number = 0
  private length: number = 0

  constructor (length: number, init?: T) {
    this.length = length
    init && this.stack.push(init)
  }

  // 撤销
  public undo () {
    if (this.isBottom()) {
      return undefined
    } {
      const idx = (this.cursor - 1 + this.length) % this.length
      this.cursor = idx
      return this.stack[this.cursor]
    }
  }

  //重做
  public redo () {
    if (this.isTop()) {
      return undefined
    } else {
      const idx = (this.cursor + 1) % this.length
      this.cursor = idx
      return this.stack[this.cursor]
    }
  }

  public push(item:T) {
    const idx = (this.cursor + 1) % this.length
    this.top = this.cursor = idx
    this.stack[this.cursor] = item
    // 栈满后，栈底往前移动一位
    if (idx === this.bottom) {
      this.bottom = (idx + 1) % this.length
    }
  }

  public isTop () {
    return this.top === this.cursor
  }

  public isBottom () {
    return this.bottom === this.cursor
  }
}

export default Stack
