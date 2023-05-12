import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./Store/store";
import UserSelectedCart from "./components/UserSelectedCart";
import { useState } from "react";

function App() {
  const [showCart,setShowCart]=useState(false)
  return (
    <>
      <Provider store={store}>
        <Navbar showCart={showCart} setShowCart={setShowCart}/>
      {
        !showCart? 
        <Home />
        :
        <UserSelectedCart/>
      }
      </Provider>
    </>
  );
}

export default App;
