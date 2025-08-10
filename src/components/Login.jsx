import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../contexts/authContext";

function Login() {
  console.log("mounting Login comp");

  const { isLoggedIn, login } = useAuth();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("formref:", formRef.current);
    if(formData.email == '' || formData.password == '') {
      setValidated(true);
      return;
    }
    setValidated(true);
    login(); 
    console.log("Submitted data:", formData);
  };

  return (
    <>
      <Container className="text-center mt-5 pt-5">
        <h1>Welcome to Linkedinn!</h1>
        <h2>Please, access your account to start browsing</h2>

        <div className="d-flex justify-content-center mt-5 pt-5">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="w-50"
            ref={formRef}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password </Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}
export default Login;
