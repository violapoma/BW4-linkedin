import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { TokenProvider } from "./contexts/tokenContext";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <TokenProvider>
          <Routes>
            <Route path="/" element={<Home />} /> {/*  */}
            <Route path="/login" element={<Login />} /> {/*   */}
            <Route path="/profile/myprofile" element={<MyProfile />} />{" "}
            {/* pagina personale */}
            <Route path="/profile/:userID" element={<Profile />} />{" "}
            {/* pagina di un utente specifico */}
            <Route path="*" element={<NotFound />} /> {/*  */}
          </Routes>
        </TokenProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
