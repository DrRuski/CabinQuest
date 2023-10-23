import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./pages/authentication/login";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="home" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}
