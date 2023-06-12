import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './compoents/NavBar';
import AddBooks from './pages/AddBooks';
import SearchBook from './pages/SearchBook';
import Footer from './compoents/Footer';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<AddBooks />}   />
        <Route path='/seachBooks' element={<SearchBook />}   />
      
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
