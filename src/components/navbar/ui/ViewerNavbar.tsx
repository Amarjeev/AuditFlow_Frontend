import { Link } from "react-router-dom";
import { viewerLinks } from "../hooks/NavbarLinks";
import { useNavbarLogic } from "../hooks/useNavbarlogic";

const ViewerNavbar = () => {
  const { open, setOpen, handleLogout, isActive } = useNavbarLogic();

  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          Audit<span className="text-sky-400">Flow</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {viewerLinks.map((link) =>
            link.action === "logout" ? (
              <button
                key={link.label}
                onClick={handleLogout}
                className="text-sm font-medium text-amber-400 hover:text-amber-300 transition"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`text-sm font-medium transition ${
                  isActive(link.path)
                    ? "text-sky-400 border-b-2 border-sky-400"
                    : "text-indigo-200 hover:text-white"
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
          className="md:hidden text-2xl text-indigo-200 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/*  Mobile Menu */}
      {open && (
        <div className="md:hidden bg-indigo-800 px-4 pb-4">
          <div className="flex flex-col gap-3">
            {viewerLinks.map((link) =>
              link.action === "logout" ? (
                <button
                  key={link.label}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-left text-sm font-medium text-amber-400 hover:text-amber-300 transition"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path!}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium transition ${
                    isActive(link.path)
                      ? "text-sky-400"
                      : "text-indigo-200 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ViewerNavbar;
