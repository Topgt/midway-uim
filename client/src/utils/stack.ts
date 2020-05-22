// 严格来说它并不是一个循环栈，因为他会忽略第一个栈顶元素
class Stack<T> {
  private Stack: Array<T> = [];
  private cursor: number = 0
  private top: number = 0
  private bottom: number = 0
  private length: number = 0

  constructor (length: number) {
    this.length = length
  }

  // 撤销
  public undo () {
    if (this.isBottom()) {
      return undefined
    } {
      const idx = (this.cursor - 1 + this.length) % this.length
      this.cursor = idx
      return this.Stack[this.cursor]
    }
  }

  //重做
  public redo () {
    if (this.isTop()) {
      return undefined
    } else {
      const idx = (this.cursor + 1) % this.length
      this.cursor = idx
      return this.Stack[this.cursor]
    }
  }

  public push(item:T) {
    const idx = (this.cursor + 1) % this.length
    this.top = this.cursor = idx
    this.Stack[this.cursor] = item
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
