import React, {useEffect, useState} from 'react';
import "./Testimonials.css"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import useLocalStorage from "../../../util/useLocalStorage";


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
  const [jwt,setJwt] = useLocalStorage("","jwt")
    const [comments, setComments] = useState([])

    useEffect(() =>{
        fetch('../home/testimonial', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            console.log(json)
            setComments(JSON.parse(JSON.stringify(json)))
        });
    }, []);


  return (
    <>
    <div className="section-testimonials mt-0">
    <div className='pt-5'><h2 className='pt-4'>Our customers can't live without us</h2></div>
    <Slider {...settings} >
      {comments.map((comment)=>{
        return (
          <section key={comment.id}>
            <div className="testimonials">
                <blockquote>{comment.content}
                    <cite> &mdash; {comment.user.firstName} {comment.user.lastName}</cite>
                </blockquote>
            </div>
            
    </section>
        )
        
      })}
    
    
    </Slider>
    </div>
    </>
  )
}

export default Testimonials