import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import Navbar from './components/pages/layout/Navbar';
import Footer from './components/pages/layout/Footer';
import Container from './components/pages/layout/Container';


// pages
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/MyPets';
import Message from './components/pages/layout/Message';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';

//context
import { UserProvider } from './context/UserContext';
import MyAdoptions from './components/pages/Pet/MyAdoptions';



function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message/>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/register" element={<Register />}>
            </Route>
            <Route path="/user/profile" element={<Profile />}>
            </Route>
            <Route path="/pet/mypets" element={<MyPets />}>
            </Route>
            <Route path="/pet/add" element={<AddPet />}>
            </Route>
            <Route path="/pet/:id" element={<PetDetails />}>
            </Route>
            <Route path="/pet/myadoptions" element={<MyAdoptions />}>
            </Route>
            <Route path="/pet/edit/:id" element={<EditPet />}>
            </Route>
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App;
