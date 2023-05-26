import { ObjectId } from "mongodb"

import { Icons } from "@components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  items?: NavItem[]
  href?: string
  icon?: keyof typeof Icons
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
    terms: string
    privacy: string
  }
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
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
