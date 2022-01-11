import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Rate } from 'antd';
import { MdNightlightRound } from 'react-icons/md'
import {motion} from 'framer-motion'

const container = {
    show: {
        transition: {
            staggerChildren: .6
        }

    }
}
const showItem = {
    show: {
        opacity: 1,
        y: 0,
        width: '100%',
        transition: {
            type: 'linear',
            bounce: 1,
            duration: .8
        }
    },
    hidden: {
        opacity: 0,
        height: '0%',
        y:22

    }

}

const RoomItem = ({ room }) => {
    const { images, _id, name, pricePerNight, ratings, numOfReviews } = room
    return (
        <motion.div variants={container} className="col-sm-12 col-md-6 col-lg-3 my-3 " initial='hidden' animate='show'>
            <motion.div variants={showItem} className="card p-2 addRadius shadow-sm ">
                <Link href={`/room/${_id}`}>
                    <Image
                        className="card-img-top mx-auto imageHover"
                        height={170}
                        width={100}
                        src={images[0].url}
                        alt={name}
                        priority={true}
                    />
                </Link>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title  fw-normal">
                        <Link href={`/room/${_id}`}>
                            <a>{name}</a>
                        </Link>
                    </h5>

                    <div className="ratings mt-auto mb-3">
                        <p className="card-text "><b>GHS {pricePerNight} </b> / night <MdNightlightRound /></p>

                        <div className="rating-outer">
                            <div className="rating-inner"
                                style={{ width: `${(ratings / 5) * 100}%` }}
                            >

                            </div>
                        </div>
                        <span id="no_of_reviews">({numOfReviews} Reviews)</span>
                    </div>

                    <button className="btn btn-block view-btn">
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
