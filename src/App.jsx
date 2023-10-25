import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import AuthContainer from "./pages/authentication/authContainer";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthContainer />}></Route>
        <Route path="home" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}
