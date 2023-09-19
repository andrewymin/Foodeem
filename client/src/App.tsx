// import { useEffect } from "react";
import "../src/css/app.css";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
