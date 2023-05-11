import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./Store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Home />
      </Provider>
    </>
  );
}

export default App;
