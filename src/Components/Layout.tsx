import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <header className="text-white">
        <Header />
      </header>
      <main className="d-flex justify-content-center my-4">
        <Outlet />
      </main>
      <footer className="text-white text-center">
        <div>
          <span>&copy; 2022 creativeLabs.</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
