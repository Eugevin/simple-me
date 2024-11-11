export function useAnimations(fn: Function) {
  let animationsActive: boolean = false
  const loaded = useState<boolean>('loaded')

  watch(loaded, () => {
    animationsActive = true
    fn()
  })

  onMounted(() => {
    setTimeout(() => {
      if (loaded.value && !animationsActive) {
        fn()
      }
    }, 1000)
  })
}