import React from 'react'
import { TypeAnimation } from 'react-type-animation';

function Banner() {
  return (
    <div className="relative w-full min-h-[800px] text-white flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center z-[-1]" style={{ backgroundImage: "url(../../public/image/bg.jpg)" }}>
  <div className="text-center">
    <p className="text-lg font-semibold">Welcome to Our Coffee Shop!</p>
    <p className="text-sm">Explore our menu and discover your perfect brew.</p>
    <TypeAnimation
      sequence={[
        'We produce food for Mice',
        1000, 
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  </div>
</div>


  )
}

export default Banner