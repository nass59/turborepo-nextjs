import { type Route } from "next"
import { type ObjectId } from "mongodb"

import { type Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: Route<string> | URL
  disabled?: boolean
  external?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  items?: NavItem[]
  href?: string
  disabled?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  author: string
  links: {
    twitter: string
    github: string
    api_github: string
    terms: string
    privacy: string
  }
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DocsConfig = {
  sidebarNav: SidebarNavItem[]
}

export type Post = {
  _id: string | ObjectId
  title?: string
  content?: string
  createdAt?: string
}

export interface PostProps {
  post: Post
}

export type User = {
  _id: string | ObjectId
  email?: string
  name?: string
  image?: string
}
