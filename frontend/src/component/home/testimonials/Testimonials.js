import React from 'react'
import "./Testimonials.css"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';


function Testimonials() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <>
    <div className="section-testimonials mt-0">
    <div className='pt-5'><h2 className='pt-4'>Our customers can't live without us</h2></div>
    <Slider {...settings} >
    <section>
            <div className="testimonials">
                <blockquote>YUKI is just awesome! I just launched a startup which leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!
                    <cite> &mdash; Alberto Duncan</cite>
                </blockquote>
            </div>
            
    </section>
    <section>
            <div className="testimonials">
                <blockquote>YUKI is just awesome! I just launched a startup which leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!
                    <cite> &mdash; Alberto Duncan</cite>
                </blockquote>
            </div>
    </section>
    <section >
            <div className="testimonials">
                <blockquote>YUKI is just awesome! I just launched a startup which leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!
                    <cite> &mdash; Alberto Duncan</cite>
                </blockquote>
            </div>
    </section>
    <section >
            <div className="testimonials">
                <blockquote>YUKI is just awesome! I just launched a startup which leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!
                    <cite> &mdash; Alberto Duncan</cite>
                </blockquote>
            </div>
    </section>
    </Slider>
    </div>
    </>
  )
}

export default Testimonials