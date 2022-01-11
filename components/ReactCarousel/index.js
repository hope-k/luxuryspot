import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'


const ReactCarousel = ({ images, name }) => {
    return (
        <Carousel fade={true} slide={true} interval={2000}>

            {
                images && images.map(image => (

                    <Carousel.Item key={image.public_id} style={{ transition: 'opacity .25s ease-in-out' }}>
                        <div style={{ width: '100%', height: '440px', position: 'relative'}}>
                            <Image
                                className='d-block m-10 rounded-3'
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
