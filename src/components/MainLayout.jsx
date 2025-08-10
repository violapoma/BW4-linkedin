import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  console.log('mounting main layout');

  return(
    <>
    <Header />
    <Outlet /> 
    </>
    )
}
export default MainLayout; 