export function useAnimations(fn: () => void) {
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
    }, 500)
  })
}
