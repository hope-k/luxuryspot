import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Rate } from 'antd';
import { MdNightlightRound } from 'react-icons/md'
import { motion } from 'framer-motion'
import ReactCarousel from '../ReactCarousel/index'
const container = {
    show: {
        transition: {
            staggerChildren: .8
        }

    }
}
const showItem = {
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: [.6, .01, -.05, .95],
            duration: .8
        }
    },
    hidden: {
        opacity: 0,
        scale: 0.70

    }

}

const RoomItem = ({ room}) => {
    const { images, _id, name, pricePerNight, ratings, numOfReviews } = room
    return (
        <motion.div variants={container} className="col-sm-12 col-md-6 col-lg-3 my-3 " initial='hidden' animate='show'>
            <motion.div variants={showItem} className="card p-2 addRadius shadow-sm ">
                <Link href={`/room/${_id}`}>
                    <div className="card-img-top mx-auto imageHover addRadiusCarousel">
                        <ReactCarousel
                            images={images}
                            name={name}
                            priority={true}
                            roomItem
                        />
                    </div>
                </Link>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title  rale fw-bold">
                        <Link href={`/room/${_id}`}>
                            <a>{name}</a>
                        </Link>
                    </h5>

                    <div className="ratings mt-auto mb-3">
                        <p className="card-text rale fw-bold">GHS {pricePerNight} / night <MdNightlightRound /></p>

                        <div className="rating-outer">
                            <div className="rating-inner"
                                style={{ width: `${(ratings / 5) * 100}%` }}
                            >

                            </div>
                        </div>
                        <span id="no_of_reviews">({numOfReviews} Reviews)</span>
                    </div>

                    <button className="btn btn-block view-btn add">
                        <Link href={`/room/${_id}`}>
                            <a>View Details</a>
                        </Link>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RoomItem
