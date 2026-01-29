import { useState } from "react"
import { useLocation } from "react-router-dom"
import type { MenuItem } from "./NavbarLinks"

export const useAdminNavbar = () => {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const location = useLocation()

  const handleLogout = () => {
    console.log("logout")
    // TODO: clear token + redirect
  }

  const isActive = (path?: string) =>
    path === location.pathname

  const isSettingsActive = (children?: MenuItem[]) =>
    children?.some((child) => child.path === location.pathname)

  return {
    open,
    setOpen,
    settingsOpen,
    setSettingsOpen,
    handleLogout,
    isActive,
    isSettingsActive,
  }
}
