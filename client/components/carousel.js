import React from 'react'
import Carousel from 'react-elastic-carousel'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

const RockCarousel = () => {
  const items = [
    {id: 31, imageUrl: '/RockImages/smooch.png'},
    {id: 33, imageUrl: '/RockImages/embarrased.JPG'},
    {id: 30, imageUrl: '/RockImages/yawn.png'}
  ]

  return (
    <div className="carousel">
      <Carousel enableAutoPlay={true} autoPlaySpeed={2000}>
        {items.map(item => (
          <div key={item.id}>
            <Link to={`/rocks/${item.id}`} component={SingleRock}>
              <img className="carouselimg" src={item.imageUrl} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default RockCarousel
