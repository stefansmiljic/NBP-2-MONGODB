import './App.css';
import Background from './Background';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <Background />
      <Home />
      <Products />
      <Cart />
      <Navbar />
    </div>
  );
}

export default App;