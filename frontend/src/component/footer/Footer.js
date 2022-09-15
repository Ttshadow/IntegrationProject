import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
  return (
    <Container className="mt-5 py-5 footer">
      <Row> 
        <Col>
        <h6 className="text-uppercase">Logo</h6>
          <p className="pt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius itaque omnis dignissimos
                    numquam
                    provident deleniti fugiat quasi.</p>
        </Col>
        <Col>
        <h5 className="pb-2">Featured</h5>
                <ul className="text-uppercase list-unstyled">
                    <li><Link to="">Home</Link></li>
                    <li><Link to="">Reservation</Link></li>
                    <li><Link to="">Testimonial</Link></li>
                    {/* <li><Link to="">Contact Us</Link></li> */}
                </ul>
        </Col>
        <Col>
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
        <Col>
        <h5 className="pb-2">Instagram</h5>
                <div className="row">
                    <img className="img-fluid w-25 h-50 m-2" src="images/footer_image1.jpeg" alt=""/>
                    <img className="img-fluid w-25 h-50 m-2" src="images/footer_image2.jpeg"  alt=""/>
                    <img className="img-fluid w-25 h-50 m-2" src="images/footer_image3.jpeg"  alt=""/>
                    <img className="img-fluid w-25 h-50 m-2" src="images/footer_image4.jpeg"  alt=""/>
                    <img className="img-fluid w-25 h-50 m-2" src="images/footer_image5.jpeg"  alt=""/>
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
