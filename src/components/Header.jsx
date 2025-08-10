import {
  Container,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (isLoggedIn) {
      logout();
      console.log('isloggedin after logout', isLoggedIn)
    }
  };
  return (
    <div className="border-bottom border-secodnary">
      <Navbar className="bg-white py-0 align-items-between">
        <Container>
          <div className="d-flex align-items-center">
            <Navbar.Brand to="/" as={Link} className="py-0 me-2">
              <i className="bi bi-linkedin text-primary fs-1 "></i>
            </Navbar.Brand>
            <Form>
              <InputGroup>
                <InputGroup.Text
                  id="searchField"
                  className="rounded-start-5 border-end-0 bg-white"
                >
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  className="rounded-end-5 border-start-0"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="searchField"
                />
              </InputGroup>
            </Form>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  to="/"
                  as={Link}
                  className="p-0 d-flex flex-column align-items-center px-4 text-secondary"
                >
                  <i className="bi bi-house-fill fs-4 navIcon"></i>Home
                </Nav.Link>

                <Nav.Link
                  to="#"
                  as={Link}
                  className="p-0 d-flex flex-column align-items-center px-4 text-secondary"
                >
                  <i className="bi bi-people-fill fs-4 navIcon"></i>
                  My Network
                </Nav.Link>

                <Nav.Link
                  to="#"
                  as={Link}
                  className="p-0 d-flex flex-column align-items-center px-4 text-secondary"
                >
                  <i className="bi bi-suitcase-lg-fill fs-4 navIcon"></i>
                  Jobs
                </Nav.Link>
                <Nav.Link
                  to="#"
                  as={Link}
                  className="p-0 d-flex flex-column align-items-center px-4 text-secondary"
                >
                  <i className="bi bi-suitcase-lg-fill fs-4 navIcon"></i>
                  Messaging
                </Nav.Link>
                <Nav.Link
                  to="#"
                  as={Link}
                  className="p-0 d-flex flex-column align-items-center px-4 text-secondary"
                >
                  <i className="bi bi-bell-fill fs-4 navIcon"></i>
                  Notification
                </Nav.Link>
                <div className="d-flex flex-column align-items-center justify-content-center border-end border-secodnary pe-5">
                  <i className="bi bi-person-circle fs-4 navIcon"></i>
                  <NavDropdown title="Me" id="profileDropdown">
                    <NavDropdown.Item to="/profile/myprofile" as={Link}>
                      View Profile
                    </NavDropdown.Item>
                    {isLoggedIn && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item to="/" as={Link} onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-flex flex-column align-items-center justify-content-center pe-3">
              <i className="bi bi-building-fill fs-4 navIcon"></i>
              <NavDropdown
                title="For Business"
                id="businessDropdown"
              ></NavDropdown>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center ">
              <i className="bi bi-stars fs-4 navIcon"></i>
              Try Premium for free
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
