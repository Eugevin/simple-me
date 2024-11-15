// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function throttle(fn: Function, ms: number = 500) {
  let throttle: boolean = false

  return (...args: unknown[]) => {
    if (throttle) return
    throttle = true
    setTimeout(() => {
      throttle = false
    }, ms)

    fn.call(fn, ...args)
  }
}
