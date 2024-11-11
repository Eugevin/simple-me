import fs from 'node:fs/promises'

export default defineEventHandler(async (e) => {
  const publicImages = await fs.readdir('public/images')
  return publicImages.filter(image => image.split('.').at(-1) === 'webp')
})