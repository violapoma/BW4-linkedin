import { Button, Col, Row } from "react-bootstrap";

function Experience({ experience, editMode, onEdit }) {
  const startDate = new Date(experience.startDate);
  const startDateToDisplay = startDate.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let endDateToDisplay = null;
  if (experience.endDate) {
    const date = new Date(experience.endtDate);
    if (!isNaN(date)) {
      endDateToDisplay = date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  const expImg = experience.image
    ? experience.image
    : "https://placehold.net/building-400x400.png";

  console.log("startdate", startDateToDisplay);
  console.log("enddate", endDateToDisplay);

  return (
    <Row className="border-bottom my-3">
      <Col sm={1}>
        <img src={expImg} alt="expImg" className="expImg" />
      </Col>
      <Col sm={11}>
        <div className="d-flex justify-content-between">
          <h3>
            {experience.role} <span className="fs-3">at</span>{" "}
            {experience.company}
          </h3>
          {editMode && (
            <Button
              variant="outline-light"
              className="text-dark rounded-4 border-0"
              onClick={() => onEdit(experience)}
            >
              <i className="bi bi-pencil-square"></i>
            </Button>
          )}
        </div>

        <p className="fs-4">
          From {startDateToDisplay}{" "}
          {endDateToDisplay && "to " + endDateToDisplay} ·{" "}
          <span className="fs-4">{experience.area}</span>
        </p>
        <p>{experience.description}</p>
      </Col>
    </Row>
  );
}
export default Experience;
