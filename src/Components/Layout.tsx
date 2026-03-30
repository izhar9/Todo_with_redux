import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <header className="shadow-sm border-bottom border-secondary">
        <Header />
      </header>

      <main className="flex-grow-1 d-flex justify-content-center py-5">
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Outlet />
        </div>
      </main>

      <footer className="text-center py-3 border-top border-secondary">
        <small>&copy; 2026 creativeLabs</small>
      </footer>
    </div>
  );
};

export default Layout;
