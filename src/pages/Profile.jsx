import { useEffect, useState } from "react";
import { useToken } from "../contexts/tokenContext";
import Experiences from "../components/Experiences";
import { Col, Container, Row } from "react-bootstrap";
import ProfileHeader from "../components/ProfileHeader";
import MoreProfiles from "../components/MoreProfiles";
import { useParams } from "react-router-dom";

function Profile() {
  // const [userID, setUserId]
  const {userID} = useParams();
  const otherProfileEP =
    "https://striveschool-api.herokuapp.com/api/profile/" + userID;

  const { token } = useToken();

  const [userInfo, setUserInfo] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(otherProfileEP, {
        headers: {
          Authorization: token,
        },
      });
      const userProfile = await res.json();
      setUserInfo(userProfile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userID]);
  console.log("userinfo", userInfo);

  // return (
  //   <Container className="my-5">
  //     <Row>
  //       <Col md={9}>
  //         <h1>{`${userInfo.name} ${userInfo.surname}`}</h1>
  //         <h3>{userInfo.title}</h3>
  //         <h4>{userInfo.email}</h4>
  //       </Col>
  //       <Col md={3}>
  //         <div className="w-100">
  //           <img src={userInfo.image} alt='profilepic' className="w-75 rounded-5" />
  //         </div>
  //       </Col>
  //     </Row>

  //     <Experiences userID={userID} />
  //     {/* anche il footer ci va */}
  //   </Container>
  // );
  return (
    <Container>
      <Row>
        <Col lg={9}>
          <ProfileHeader profile={userInfo} edit="off" />
          <Experiences userID={userID} />
        </Col>
        <Col lg={3}>
          <MoreProfiles currentID={userID}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
