import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './Cart';
import Home from './Home';
import Product from './Product';
import Header from './Header';
import UserProfile from './UserProfile';
import Login from './Login';


function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={[<Header />, <Home />]} />
          <Route path='/cart' element={[<Header />, <Cart />]} />
          <Route path='/products' element={[<Header />, <Product />]} />
          <Route path='/profile' element={[<Header />, <UserProfile />]} />
          <Route path='/login' element={[<Header />, <Login />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
