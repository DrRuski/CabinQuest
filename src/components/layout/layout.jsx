import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout() {
  return (
    <main>
      <Header />
      <div className="container m-auto">
        <Outlet />
        <Footer />
      </div>
    </main>
  );
}
