export function throttle(fn: Function, ms: number = 500) {
  let throttle: boolean = false

  return (...args: any) => {
    if (throttle) return
    throttle = true
    setTimeout(() => {
      throttle = false
    }, ms)

    fn.call(fn, ...args)
  }
}