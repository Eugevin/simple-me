import fs from 'node:fs/promises'

export default defineEventHandler(async () => {
  const publicImages = await fs.readdir('public/images')
  return publicImages.filter(image => image.split('.').at(-1) === 'webp')
})
