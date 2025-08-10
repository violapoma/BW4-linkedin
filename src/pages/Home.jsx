import { Container } from "react-bootstrap";
import Login from "../components/Login";
import { useAuth } from "../contexts/authContext";
import SuggestedProfiles from "./SuggestedProfiles";

function Home() {
  console.log("mounting Home comp");

  const {isLoggedIn} =useAuth(); 

  return (
    <>
      <Container className="text-center mt-5 pt-5">
        {
          isLoggedIn ? <SuggestedProfiles /> : <Login />
        }
      </Container>
    </>
  );
}
export default Home;
