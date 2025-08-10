import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { TokenProvider } from "./contexts/tokenContext";
import { AuthProvider } from "./contexts/authContext";
import MyProfile from "./pages/MyProfile";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import ProtectedLayouts from "./components/ProtectedLayouts";

function App() {
  return (
    <BrowserRouter>
      <TokenProvider>
        <AuthProvider>  
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedLayouts />}>
                <Route path="/profile/myprofile" element={<MyProfile />} />
                {/* pagina personale */}
              </Route>
              <Route path="/profile/:userID" element={<Profile />} />
              {/* pagina di un utente specifico */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;
