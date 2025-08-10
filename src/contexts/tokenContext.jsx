import { createContext, useContext, useState } from "react";

const TokenContext = createContext(); 

export function TokenProvider({children}) {
  const token = import.meta.env.VITE_TOKEN;
  return (
    <TokenContext.Provider value={{token}}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken(){
  return useContext(TokenContext); 
}