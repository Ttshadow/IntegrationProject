import React from 'react'
import Slider from './slider/Slider'
import Service from './service/Service'
import Information from './information/Information'
import Testimonials from './testimonials/Testimonials'
import MapAndReservation from './mapAndReservation/MapAndReservation'

function Home() {
  return (
    <div>
      <Slider />
      <Information/>
      <Service />
      <Testimonials/>
      <MapAndReservation/>
    </div>
  )
}
export default Home;