import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = () => {
  return <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
            <Route path="/" element={<Home/>}></Route>

          </Routes>
  </BrowserRouter>
}

export default App
