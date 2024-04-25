import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ManageMenu from "./component/Admin/MangeMenu/ManageMenu";
import Promotion from "./component/Admin/Promotion/Promotion";
import Product from "./component/Product";
import Admin from "./pages/Admin/Admin";
import ChangePassword from "./pages/ChangePassword";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Product />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<Forgot />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="admin" element={<Admin />}>
            <Route path="" element={<ManageMenu />} />
            <Route path="admin/Promotion" element={<Promotion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
