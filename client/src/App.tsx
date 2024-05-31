import "./css/app.css";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Nav />
          <AllRoutes />
          <Footer />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
