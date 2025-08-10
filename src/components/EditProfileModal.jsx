import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EditProfileModal({ show, handleClose, onSubmit, initialData }){
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Popola il form per la modifica
    } else {
      // reset per la modalità "aggiunta"
      setFormData({
        name: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        area: "",
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await onSubmit(formData); // chiama la funzione passata dal genitore
      handleClose();
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Role *</Form.Label>
            <Form.Control
              required
              type="text"
              name="role"
              value={formData.role}
              autoFocus
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Company *</Form.Label>
            <Form.Control
              required
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-between w-100">
            <Form.Group
              className="mb-3 w-50 pe-2"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Label>Start date *</Form.Label>
              <Form.Control
                required
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 w-50 ps-2"
              controlId="exampleForm.ControlInput4"
            >
              <Form.Label>End date </Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              required
              as="textarea"
              name="description"
              value={formData.description}
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Area *</Form.Label>
            <Form.Control
              required
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default EditProfileModal; 