import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import useLocalStorage from "../../util/useLocalStorage";
import { Button, Col, Row } from "react-bootstrap";
import EditPromotion from './EditPromotion';
import AddPromotion from "./AddPromotion";

function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  let promotionIdRef = useRef();

  const deletePromotion = (id) => {
    fetch(`../promotion?promotionId=${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
      });
  };

  useEffect(() => {
    fetch("../promotion", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPromotions(data);
      });
  }, []);

  return (
    <>
    <AddPromotion setPromotions={setPromotions}/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Promotion Id</th>
          <th>Code</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {promotions.map((promotion, index) => {
          return (
            <tr key={promotion.id}>
              <td>{promotion.id}</td>
              <td>{promotion.code}</td>
              <td>{promotion.title}</td>
              <td>{promotion.description}</td>
              <td>{promotion.status ? "Active" : "Inactive"}</td>
              <td>
                <Row>
                  <Col>
                    <EditPromotion promotion={promotion} setPromotions={setPromotions}/>
                  </Col>
                  <Col>
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        deletePromotion(promotion.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </>
  );
}

export default Promotion;
