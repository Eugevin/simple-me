export interface Cursor {
  x: number
  y: number
  active: boolean
  hover: boolean
}

export interface Page {
  link: string
  title: string
}

export interface Draft {
  link: string
  title: string
  image: string
  description: string
  details: string[]
  stack: string
}
