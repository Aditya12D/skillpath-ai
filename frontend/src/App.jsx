import { BrowserRouter , Routes,Route } from "react-router-dom"
import LandingPage from "./pages/landingpage"
import AboutPage from "./pages/aboutpage"
import NotFoundPage from "./pages/notfoundpage"
import ContactPage from "./pages/contactpage"
import AuthPage from "./pages/authpage"
import DashboardPage from "./pages/dashboardpage"
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
