import { BrowserRouter, Router , Routes , Route } from 'react-router-dom'
import './App.css'
import Product from './component/Product'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
