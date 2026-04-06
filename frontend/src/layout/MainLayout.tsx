import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">

      <header className="w-full bg-gray-800 text-white">
        <div className="w-[72rem] mx-auto p-4">
          <Link to="/">
            <h1 className="text-xl font-bold">映画記録</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="w-[72rem] mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="w-full bg-gray-100 text-gray-700">
        <div className="w-[72rem] mx-auto p-4 text-center">
          © 2026 映画記録
        </div>
      </footer>

    </div>
  );
}

export default MainLayout;