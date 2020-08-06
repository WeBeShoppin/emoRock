import React from 'react'
import Carousel from 'react-elastic-carousel'

const RockCarousel = () => {
  const items = [
    {id: 1, title: 'item #1', imageUrl: '/RockImages/cute.JPG'},
    {id: 2, title: 'item #2', imageUrl: '/RockImages/love1.JPG'},
    {id: 3, title: 'item #3', imageUrl: '/RockImages/disgust.JPG'}
  ]

  return (
    <div className="carousel">
      <Carousel>
        {items.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} />
            <p>{item.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default RockCarousel
