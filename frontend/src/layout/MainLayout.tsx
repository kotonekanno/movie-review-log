import { Link, Outlet, useLocation } from "react-router-dom";

import LogoutButton from "@/components/button/LogoutButton";

const version = import.meta.env.VITE_APP_VERSION;

function MainLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">

      <header className="w-full bg-[#742020] text-white">
        <div className="w-[72rem] mx-auto p-4 flex items-center justify-between px-30">

          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="text-xl font-bold">映画記録</h1>
            </Link>

            <nav className="flex gap-4 text-sm font-medium">
              <Link
                to="/reviews"
                className={`px-3 py-1 rounded-md transition ${
                  isActive("/reviews")
                    ? "bg-white text-[#742020]"
                    : "hover:bg-white/20"
                }`}
              >
                レビュー一覧
              </Link>

              <Link
                to="/watchlist"
                className={`px-3 py-1 rounded-md transition ${
                  isActive("/watchlist")
                    ? "bg-white text-[#742020]"
                    : "hover:bg-white/20"
                }`}
              >
                ウォッチリスト
              </Link>
            </nav>
          </div>

          <LogoutButton />
        </div>
      </header>

      <main className="flex-1">
        <div className="w-[72rem] mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="w-full bg-gray-100 text-gray-700">
        <div className="w-[72rem] mx-auto p-4 text-center">
          © 2026 映画記録 v{version}
        </div>
      </footer>

    </div>
  );
}

export default MainLayout;