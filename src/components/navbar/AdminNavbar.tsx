import { Link } from "react-router-dom"
import { adminLinks } from "./NavbarLinks"
import { useAdminNavbar } from "./useAdminNavbar"

const AdminNavbar = () => {
  const {
    open,
    setOpen,
    settingsOpen,
    setSettingsOpen,
    handleLogout,
    isActive,
    isSettingsActive,
  } = useAdminNavbar()

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          Audit<span className="text-indigo-400">Flow</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {adminLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={`text-sm font-medium transition ${
                    isSettingsActive(link.children)
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label} ▾
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-md bg-gray-800 shadow-lg">
                    {link.children.map((child) =>
                      child.action === "logout" ? (
                        <button
                          key={child.label}
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                        >
                          {child.label}
                        </button>
                      ) : (
                        <Link
                          key={child.path}
                          to={child.path!}
                          className={`block px-4 py-2 text-sm transition ${
                            isActive(child.path)
                              ? "bg-gray-700 text-indigo-400"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`text-sm font-medium transition ${
                  isActive(link.path)
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>
    </nav>
  )
}

export default AdminNavbar
