import { useNavigate } from "react-router-dom";
import { ShieldCheck, BarChart3, Eye } from "lucide-react";

const roles = [
  {
    key: "admin",
    title: "Admin",
    desc: "Manage users, settings & system access",
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    key: "analyst",
    title: "Analyst",
    desc: "Analyze data, reports & insights",
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    key: "viewer",
    title: "Viewer",
    desc: "View dashboards and read-only data",
    icon: Eye,
    gradient: "from-amber-500 to-orange-600",
  },
];

function LandingPage() {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Welcome 👋
          </h1>

          <p className="text-gray-300 max-w-md">
            Please select your role to continue to the login page
          </p>
        </div>

        {/* Role Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.key}
                onClick={() => navigate(`/login/${role?.key}`)}
                className="group relative rounded-xl p-6 bg-linear-to-br
                  from-white/10 to-white/5 border border-white/20
                  hover:border-white/40 transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl text-left"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-br ${role.gradient}
                  flex items-center justify-center text-white mb-4`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {role.title}
                </h3>

                <p className="text-sm text-gray-300 mt-1">{role.desc}</p>

                <span className="mt-4 inline-block text-sm font-medium text-white/70 group-hover:text-white">
                  Continue →
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400">
          Secure access • Role-based authentication
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
