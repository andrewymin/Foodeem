// import { useEffect } from "react";
import "./css/app.css";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { AuthProvider } from "./components/DataContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <AllRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
