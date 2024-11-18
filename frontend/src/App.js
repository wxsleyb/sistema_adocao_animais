import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import Navbar from './components/pages/Layout/Navbar';
import Footer from './components/pages/Layout/Footer';
import Container from './components/pages/Layout/Container';


// pages
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;
