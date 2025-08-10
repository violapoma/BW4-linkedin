import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomeSuggestedProfiles({ profile }) {
  // a volte profile.image da stringa vuota, copro anche quel caso così
  let imgToUse =
    profile.image == ""
      ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
      : profile.image;

  return (
    <Link to={`/profile/${profile._id}`}>
    
        <Row className="mb-3 flex-start">
          <Col sm={1}>
            <div className="smallProfilePicDiv">
              <img src={imgToUse} />
            </div>
          </Col>
          <Col sm={9} className="text-start px-5">
            <h4 className="fs-6">
              {profile.name} {profile.surname}
            </h4>
            <p className="fs-6 fw-light">{profile.title} </p>
          </Col>
        </Row>

    </Link>
  );
}

export default HomeSuggestedProfiles;
