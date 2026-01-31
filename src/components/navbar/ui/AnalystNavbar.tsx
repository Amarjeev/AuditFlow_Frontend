import { Link } from "react-router-dom";
import { analystLinks } from "../hooks/NavbarLinks";
import { useNavbarLogic } from "../hooks/useNavbarlogic";

const AnalystNavbar = () => {
  const { open, setOpen, handleLogout, isActive } = useNavbarLogic();

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          Audit<span className="text-teal-400">Flow</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {analystLinks.map((link) =>
            link.action === "logout" ? (
              <button
                key={link.label}
                onClick={handleLogout}
                className="text-sm font-medium text-rose-400 hover:text-rose-300"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`text-sm font-medium transition ${
                  isActive(link.path)
                    ? "text-teal-400 border-b-2 border-teal-400"
                    : "text-slate-300 hover:text-white"
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
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/*  Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-800 px-4 pb-4">
          <div className="flex flex-col gap-3">
            {analystLinks.map((link) =>
              link.action === "logout" ? (
                <button
                  key={link.label}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-left text-sm font-medium text-rose-400 hover:text-rose-300"
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
                      ? "text-teal-400"
                      : "text-slate-300 hover:text-white"
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

export default AnalystNavbar;
