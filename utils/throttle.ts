export function throttle<T extends unknown[]>(
  fn: (...args: T) => void, ms: number = 500,
) {
  let throttle: boolean = false

  return (...args: T) => {
    if (throttle) return
    throttle = true
    setTimeout(() => {
      throttle = false
    }, ms)

    fn(...args)
  }
}
