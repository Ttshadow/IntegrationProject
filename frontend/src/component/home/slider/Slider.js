import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";
import { useNavigate } from "react-router-dom";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const jumpHandlerMenu = () => {
    navigate("/dine");
  };

  const jumpHandlerReservation = () => {
    navigate("/newreservation");
  };

  return (
    <div className="container-slider mt-1">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img
              src={process.env.PUBLIC_URL + `/images/banner${index + 1}.jpeg`}
              alt="banners"
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} key="next" />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} key="prev" />
      <div className="banner-container mt-4">
        <h2>Japanese Inspired Cuisine</h2>
        <p>Fresh Ingredients Sourced Globally</p>
        <button
          type="button"
          className="btn btn-warning me-3"
          onClick={jumpHandlerMenu}
        >
          Order Now
        </button>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={jumpHandlerReservation}
        >
          Book A Table
        </button>
      </div>

      <div className="container-dots">
        {dataSlider.map((item, index) => (
          <div
            key={item.id}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
