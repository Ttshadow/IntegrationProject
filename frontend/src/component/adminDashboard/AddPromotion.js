import React, { useState,useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useLocalStorage from "../../util/useLocalStorage";

function AddPromotion({setPromotions}) {
  const [show, setShow] = useState(false);
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const codeRef = useRef();
  const descriptionRef = useRef();
  const titleRef = useRef();
  const statusRef = useRef();
  const discountRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addPromotion = (e) => {
    e.preventDefault();
    fetch('../promotion', {
        method: "post",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            code:codeRef.current.value,
            title:titleRef.current.value,
            description:descriptionRef.current.value,
            discount:discountRef.current.value,
            status:statusRef.current.value === 'Active' ? true : false,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setShow(false);
          setPromotions(data);
        });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mt-3 mb-3">
        Add Promotion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Promotion Code</Form.Label>
              <Form.Control type="text" ref={codeRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" ref={descriptionRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="text" ref={discountRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                defaultValue="Inactive"
                ref={statusRef} disabled
              >
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
          <Button variant="primary" onClick={addPromotion}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPromotion;
