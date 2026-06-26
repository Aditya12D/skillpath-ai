import { BrowserRouter , Routes,Route } from "react-router-dom"
import LandingPage from "./pages/landingpage"
import AboutPage from "./pages/aboutpage"
import NotFoundPage from "./pages/notfoundpage"
import ContactPage from "./pages/contactpage"
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App