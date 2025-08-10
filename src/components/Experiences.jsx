import { useEffect, useState } from "react";
import { useToken } from "../contexts/tokenContext";
import Experience from "./Experience";
import { Button, Form, Modal } from "react-bootstrap";
import ExperienceFormModal from "./ExperienceFormModal";
import axios from "../data/axios";

function Experiences({ userID, edit }) {
  const experiencesEP = `/profile/${userID}/experiences`;
  const { token } = useToken();
  const editMode = edit == "on" ? true : false;

  const [experiences, setExperiences] = useState([]);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    setFormData({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    });
    setValidated(false);
  };
  const handleShow = () => setOpenModal(true);
  // form validation
  const [validated, setValidated] = useState(false);

  const handleOpenForEdit = (experience) => {
    setExperienceToEdit(experience);
    setOpenModal(true);
  };

  const handleOpenForAdd = () => {
    setExperienceToEdit(null);
    setOpenModal(true);
  };

  //form submit
  // const [formData, setFormData] = useState({
  //   role: "",
  //   company: "",
  //   startDate: "",
  //   endDate: "",
  //   description: "",
  //   area: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const fetchExperiences = async () => {
  //   try {
  //     const res = await fetch(experiencesEP, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     const userExperiences = await res.json();
  //     setExperiences(userExperiences);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(experiencesEP);
      setExperiences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [userID]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   } else {
  //     console.log("formData", formData);

  //     try {
  //       const res = await fetch(experiencesEP, {
  //         method: "POST",
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (!res.ok) throw new Error("Errore nella POST di formData", formData);

  //       const added = await res.json();
  //       console.log("Esperienza aggiunta:", added);

  //       // Refresh lista esperienze
  //       fetchExperiences();

  //       handleClose();

  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   setValidated(true);
  // };

  // const handleSubmit = async (formData) => {
  //   const endpoint = experienceToEdit
  //     ? `${experiencesEP}/${experienceToEdit._id}`
  //     : experiencesEP;

  //   const method = experienceToEdit ? "PUT" : "POST";

  //   try {
  //     const res = await fetch(endpoint, {
  //       method,
  //       headers: {
  //         Authorization: token,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) throw new Error("Errore nella richiesta");

  //     await fetchExperiences(); // refresh della lista
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (formData) => {
    const endpoint = experienceToEdit
      ? `${experiencesEP}/${experienceToEdit._id}`
      : experiencesEP;

    const method = experienceToEdit ? "put" : "post";

    try {
      const res = await axios[method](endpoint, formData);
      await fetchExperiences(); // refresh della lista
    } catch (err) {
      console.error(err);
    }
  };

  console.log("experiences", experiences);

  return (
    <>
      <div className="rounded-3 bg-white border mt-4 p-4" id="experiences">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className={editMode ? "d-inline" : ""}>Experiences</h2>
          {editMode && (
            <Button variant="outline-secondary" onClick={handleShow}>
              Add Experience
            </Button>
          )}
        </div>

        {experiences.length > 0
          ? experiences.map((exp) => (
              <Experience
                key={exp._id}
                experience={exp}
                editMode={editMode}
                onEdit={handleOpenForEdit}
              />
            ))
          : "Still no experiences to show"}
      </div>
      <ExperienceFormModal
        show={openModal}
        handleClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        initialData={experienceToEdit}
      />
    </>
  );
}

export default Experiences;
