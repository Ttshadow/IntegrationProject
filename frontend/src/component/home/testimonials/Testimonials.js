import React from 'react'
import "./Testimonials.css"

function Testimonials() {
  return (
    <>
      <section className="section-testimonials mt-0">
        <div className='pt-5'><h2 className='pt-4'>Our customers can't live without us</h2></div>
        <div className="flexbox-3">
            <div className="testimonials">
                <blockquote>YUKI is just awesome! I just launched a startup which leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!
                    <cite><img src=""/> &mdash; Alberto Duncan</cite>
                </blockquote>
            </div>
            
            <div className="testimonials">
                <blockquote>Inexpensive, healthy and great-tasting meals. We have lots of food delivery here in Montreal, but no one comes even close to YUKI. Me and my family are so in love!
                    <cite><img src=""/>&mdash; Joana Silva</cite>
                </blockquote>
            </div>
            
            <div className="testimonials">
                <blockquote>Best Restaurant in Montreal. All ingredients are fresh. Keep up the great work!
                    <cite><img src=""/>&mdash; Milton Chapman</cite>
                </blockquote>
            </div> 
        </div>
    </section>
    </>
  )
}

export default Testimonials