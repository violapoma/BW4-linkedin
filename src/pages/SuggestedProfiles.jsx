import { Col, Container, Row } from "react-bootstrap";
import { useToken } from "../contexts/tokenContext";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import AnotherUserPreview from "../components/AnotherUserPreview";
import HomeSuggestedProfiles from "../components/HomeSuggestedProfiles";

function SuggestedProfiles() {
  const allProfilesEP = "https://striveschool-api.herokuapp.com/api/profile/";
  const { token } = useToken();
  const { myId } = useAuth();
  console.log("myId in Suggested profiles", myId);

  const [users, setUsers] = useState([]);

  const fetchProfiles = async () => {
    try {
      const res = await fetch(allProfilesEP, {
        headers: {
          Authorization: token,
        },
      });
      const profiles = await res.json();

      // console.log('profiles', profiles)
      let filtered = profiles.filter((profile) => profile._id !== myId);

      const randomUsers = [];
      const usedIdxs = new Set();

      // console.log('filtered length', filtered.length)

      while (randomUsers.length < 21) {
        const randIdx = Math.floor(Math.random() * filtered.length);
        if (!usedIdxs.has(randIdx)) {
          usedIdxs.add(randIdx);
          randomUsers.push(filtered[randIdx]);
        }
      }

      setUsers(randomUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [myId]);

  return (
    <Container className="rounded-5 bg-white p-4">
      <h2>More profiles for you</h2>
      <Row className="mt-4">
        {users.map((user) => (
          <Col sm={4}  key={user._id}>
            <HomeSuggestedProfiles profile={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default SuggestedProfiles;
