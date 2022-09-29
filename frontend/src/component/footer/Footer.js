import React from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
  return (
    <Container fluid className="mt-5 py-5 footer">
      <Row> 
        <Col className="col-2 offset-2">
        <h6 className="text-uppercase">YUKI</h6>
          <p className="pt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius itaque omnis dignissimos
                    numquam
                    provident deleniti fugiat quasi.</p>
        </Col>
        <Col className="col-2">
        <h5 className="pb-2">Featured</h5>
                <ul className="text-uppercase list-unstyled">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/newreservation">Reservation</Link></li>
                    <li><a href="#testimonial">Testimonial</a></li>
                    {/* <li><Link to="">Contact Us</Link></li> */}
                </ul>
        </Col>
        <Col className="col-2">
        <h5 className="pb-2">Contact Us</h5>
                <div>
                    {/* <h6 className="text-uppercase">Address</h6> */}
                    <p>123 Street Name, Montreal, Canada</p>
                </div>
                <div>
                    {/* <h6 className="text-uppercase">Phone</h6> */}
                    <p>(123) 456 7890</p>
                </div>
                <div>
                    {/* <h6 className="text-uppercase">Email</h6> */}
                    <p>email.exemple.com</p>
                </div>
        </Col>
        <Col className="col-2">
        <h5 className="pb-2">Social Media</h5>
                <div className="">
                    <Link className='mx-3'><BsInstagram /></Link>
                    <Link className='mx-3'><BsFacebook /></Link>
                    <Link className='mx-3'><BsTwitter /></Link>
                </div>
        </Col>
      </Row>

      <Row>
        <hr className='mt-4'></hr>
      <span>CopyRight ©2022 All Rights Reserved | Make with <i className="bi bi-heart-fill"></i> by YUKI Restaurant</span>
      </Row>
      
    </Container>
  )
}
