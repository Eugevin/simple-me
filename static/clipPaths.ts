const emptyClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'

export const clipPaths: Record<string, [string, string]> = {
  toTop: [
    'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    emptyClipPath
  ],
  toRight: [
    'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    emptyClipPath
  ],
  toBottom: [
    'polygon(0 0, 100% 0, 100% 0, 0 0)',
    emptyClipPath
  ],
  toLeft: [
    'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    emptyClipPath
  ]
}