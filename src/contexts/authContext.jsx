import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../data/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const myEP = "https://striveschool-api.herokuapp.com/api/profile/me";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [myId, setMyId] = useState("");

  const login = () => {
    setIsLoggedIn(true);
    navigate("/profile/myProfile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/profile/me");
        setMyId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
  
    if (isLoggedIn) {
      fetchData();
    } else {
      setMyId(""); 
    }
  }, [isLoggedIn]);
  

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, myId, setMyId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
