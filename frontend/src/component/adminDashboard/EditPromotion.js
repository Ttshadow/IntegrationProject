import React, { useState,useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useLocalStorage from "../../util/useLocalStorage";

function EditPromotion({promotion,setPromotions}) {
  const [show, setShow] = useState(false);
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const codeRef = useRef();
  const descriptionRef = useRef();
  const titleRef = useRef();
  const statusRef = useRef();
  const discountRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editSaveChanges = (e) => {
    e.preventDefault();
    fetch('../promotion', {
        method: "put",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            id: promotion.id,
            code:codeRef.current.value,
            title:titleRef.current.value,
            description:descriptionRef.current.value,
            discount:discountRef.current.value,
            status:statusRef.current.value === 'Active' ? true : false,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setShow(false);
          setPromotions(data);
        });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                disabled
                defaultValue={promotion.id}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Promotion Code</Form.Label>
              <Form.Control type="text" defaultValue={promotion.code} ref={codeRef}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                defaultValue={promotion.description}
                ref={descriptionRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                defaultValue={promotion.discount}
                ref={discountRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={promotion.title}
                ref={titleRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example" defaultValue={promotion.status ? 'Active' : 'Inactive'} ref={statusRef}>
                {/* <option>Select Status</option> */}
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPromotion;
