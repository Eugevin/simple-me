import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
      'no-console': 'error',
      'vue/multi-word-component-names': 'off',
      'max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
        },
      ],
    },
  },
  {
    files: ['server/api/*.ts'],
    rules: {
      'max-len': 'off',
    },
  },
])
