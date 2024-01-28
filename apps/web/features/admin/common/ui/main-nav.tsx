import { navRoutes } from "../constants/navbar"
import { MainNavItem } from "./main-nav-item"

export const MainNav = () => {
  return (
    <nav className="flex w-full flex-col gap-2 px-2">
      {navRoutes.map(({ path, key, label }) => (
        <MainNavItem key={key} label={label} path={path} />
      ))}
    </nav>
  )
}
