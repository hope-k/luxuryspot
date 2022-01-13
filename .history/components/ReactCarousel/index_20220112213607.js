import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'


const ReactCarousel = ({ images, name, roomItem }) => {
    return (
        <Carousel fade={true} slide={true} interval={roomItem ? 3000 : 4000}>

            {
                images && images.map(image => (

                    <Carousel.Item key={image.public_id} style={{ transition: `${roomItem ? 'opacity 3s' : 'opacity .35s'}`, animationTimingFunction: 'cubic-bezier(-.6, .01, -.05, .95)' }}>
                        <div style={{ width: '100%', height: `${roomItem ? '340px' : '440px'}`, position: 'relative' }}>
                            <Image
                                className='d-block m-10 rounded-3 addRadiusCarousel'
                                src={image.url}
                                layout='fill'
                                alt={name}

                            />
                        </div>
                    </Carousel.Item>



                ))
            }

        </Carousel>
    )
}

export default ReactCarousel
