import { BrowserRouter, Router , Routes , Route } from 'react-router-dom'
import './App.css'
import ManageMenu from './component/Admin/MangeMenu/ManageMenu'
import Promotion from './component/Admin/Promotion/Promotion'
import Product from './component/Product'
import ProductDetail from './component/ProductDetail'
import Admin from './pages/Admin/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Product />}/>
          <Route path="/ProductDetail" element={<ProductDetail/>} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="admin" element={<Admin />}>
          <Route path="" element={<ManageMenu />} />
          <Route path="admin/Promotion" element={<Promotion />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
