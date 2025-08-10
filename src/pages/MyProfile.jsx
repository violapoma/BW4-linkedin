import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import { useToken } from "../contexts/tokenContext";
import { Col, Container, Row } from "react-bootstrap";
import MoreProfiles from "../components/MoreProfiles";
import Experiences from "../components/Experiences";
import axios from "../data/axios";

function MyProfile() {
  const myEP = "https://striveschool-api.herokuapp.com/api/profile/me";
  const { token } = useToken();

  const [me, setMe] = useState({});

  // const fetchMyProfile = async () => {
  //   try {
  //     const res = await fetch(myEP, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     const myProfile = await res.json();
  //     setMe(myProfile);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchMyProfile = async () => {
    try {
      const res = await axios.get('/profile/me'); 
      setMe(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const fetchMyProfile = async () => {
  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/profile/me`, body, {
  //       headers: {
  //         Authorization: token,
  //       }
  //     }); 
  //     setMe(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  console.log("me", me);


  return (
    <Container>
      <Row>
        <Col lg={9} >
          <ProfileHeader profile={me} edit='on'/>
          <Experiences userID={me._id} edit='on'/>
        </Col>
        <Col lg={3}>
          <MoreProfiles currentID='' howMany={6}/>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
}

export default MyProfile;
