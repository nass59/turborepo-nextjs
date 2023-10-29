export interface Billboard {
  _id: string
  label: string
  imageUrl: string
}

export interface Category {
  _id: string
  name: string
  billboardId: string
}

export interface Item {
  _id: string
  name: string
  category: string
  images: string[]
  isFeatured: boolean
}
