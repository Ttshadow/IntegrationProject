import React from 'react'
import Slider from './slider/Slider'
import Service from './service/Service'
import Information from './information/Information'
import Testimonials from './testimonials/Testimonials'

export default function Home() {
  return (
    <div>
      <Slider />
      <Information/>
      <Service />
      <Testimonials/>
    </div>
  )
}
