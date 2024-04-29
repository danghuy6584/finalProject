import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ManageMenu from "./component/Admin/MangeMenu/ManageMenu";

import Product from "./component/Product/Product";
import Admin from "./pages/Admin/Admin";
import ChangePassword from "./pages/Member/ChangePassword";
import Forgot from "./pages/Member/Forgot";
import Home from "./pages/Home/Home";
import Login from "./pages/Member/Login";
import SignUp from "./pages/Member/SignUp";
import Profile from "./component/Profile/Profile";
import ManageUser from "./component/Admin/Promotion/ManageUser";
import Sales from "./component/Admin/Sales/Sales";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Product />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<Forgot />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="admin" element={<Admin />}>
            <Route path="" element={<ManageMenu />} />
            <Route path="admin/manageuser" element={<ManageUser />} />
            <Route path="admin/sales" element={<Sales />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
