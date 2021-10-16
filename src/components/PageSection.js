import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { create_page } from "../api_utils";
import PageDetail from "./PageDetail";

export default function PageSection({ pages }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    }
    const response = await create_page(name);
    if (response.status === 200) {
      setName("");
      setShow(false);
      setError("");
    } else {
      setError(response.data);
    }
  };

  const closeModal = () => {
    setName("");
    setError("");
    setShow(false);
  };
  return (
    <div className="my-2 d-flex flex-column">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-2 mx-2"
        onClick={() => setShow(!show)}
      >
        <i className="fa fa-plus"></i>
        Add Page
      </button>
      <form id="create-page">
        <Modal
          show={show}
          onHide={() => setShow(!show)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-auto">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${
                  isValid ? "" : "is-invalid"
                }`}
                id="name"
                name="name"
                placeholder="Name of Page"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isValid && (
                <div className="invalid-feedback">
                  Please provide a valid name.
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <ul className="list-group pages">
        {pages.map((page) => (
          <PageDetail page={page} key={page._id} />
        ))}
      </ul>
    </div>
  );
}
