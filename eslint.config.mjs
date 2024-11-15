import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': 'error',
    'vue/multi-word-component-names': 'off',
  },
})
