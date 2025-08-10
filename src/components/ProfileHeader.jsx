import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
import { useToken } from "../contexts/tokenContext";
//import { getAll as mioNome} from "../data/profile"; //destruttura dall'oggetto del file profile la proprietà getAll !!NOME IMPORTANTE
//import altroNomePerInsert from "../data/profile"; //default; anhce con un altro nome senza as
import altroNomePerInsert, {getAll as mioNome, get} from '../data/profile'; 

function ProfileHeader({ profile, edit }) {
  const [openModal, setOpenModal] = useState(false);
  const editMode = edit == "on" ? true : false;
  console.log("editMode", editMode);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    title: "",
    area: "",
  });
  const { token } = useToken();
  const handleClose = () => {
    setOpenModal(false);
    setFormData({
      name: "",
      surname: "",
      title: "",
      area: "",
    });
    setValidated(false);
  };

  const [validated, setValidated] = useState(false);

  // useEffect(() => {
  //   if (initialData) {
  //     setFormData(initialData); // Popola il form per la modifica
  //   } else {
  //     // reset per la modalità "aggiunta"
  //     setFormData({
  //       name: "",
  //       company: "",
  //       startDate: "",
  //       endDate: "",
  //       description: "",
  //       area: "",
  //     });
  //   }
  // }, [initialData, show]);

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

  const handleOpen = () => {
    setOpenModal(true);
  };

  const [picture, setPicture] = useState();

  const addProdfilePic = (evt) => {
    console.log('files', evt.target.files);
    setPicture(evt.target.files[0]); //array, si possono caricare più file
  };
  
  const uploadImg = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //non possiamo avere file nel form -> FormData, non JSON
    formData.append("profile", picture); //per ogni campo di input bisogna fare append all'oggetto (k:v) !!NO OGGETTO CON TUTTO !!profile obbligatorio
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/profile/${profile._id}/picture`,
      {
        method: "POST", //da slide
        headers: {
          Authorization: token,
          //no Content-Type: application/json
        },
        body: formData, //no stringify
      }
    );
  };

  return (
    <>
      <div className="border rounded-3 position-relative overflow-hidden mt-4 bg-white">
        <div className="position-relative">
          <img
            src="/src/assets/imgs/cover-placeholder.png"
            alt="cover-img"
            className="coverImg"
          />
          {editMode && (
            <Button variant="light" className="editBtnCover text-primary">
              <i className="bi bi-camera-fill "></i>
            </Button>
          )}
        </div>
        <div className="profilePicDiv position-absolute d-flex align-items-center justify-content-center">
          <img src={profile.image} alt="profile-pic" />
        </div>
        <div className="infoBox position-relative">
          {editMode && (
            <Button
              variant="outline-light"
              className="text-dark"
              onClick={handleOpen}
            >
              <i className="bi bi-pencil"></i>
            </Button>
          )}

          <h1 className="fs-3 fw-bold">
            {profile.name} {profile.surname}
            {editMode && (
              <Button id="badgeBtn" variant="outline-primary" className="mx-3">
                Add verification badge
              </Button>
            )}
          </h1>
          <h2 className="fs-5 fw-light">{profile.title}</h2>
          <p className="fs-6 text-secondary">{profile.area}</p>
        </div>

        <div className="buttonRow mx-3">
          {" "}
          {/*  button row*/}
          <Button variant="primary">{editMode ? "Open to" : "+ Follow"}</Button>
          <Button variant="outline-primary">
            {editMode ? "Add profile section" : "Message"}
          </Button>
          {editMode && (
            <Button variant="outline-primary">Enhance profile</Button>
          )}
          <Button variant="outline-dark">
            {editMode ? "Resources" : "More"}
          </Button>
        </div>
      </div>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile pic *</Form.Label>
              <Form.Control
                required
                type="file"
                name="profile"
                onChange={addProdfilePic}
              />
            </Form.Group>

            <Button variant="dark" onClick={uploadImg}>
              Upload
            </Button>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Surname *</Form.Label>
              <Form.Control
                required
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                required
                type="text"
                name="startDate"
                value={formData.title}
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
    </>
  );
}

export default ProfileHeader;
