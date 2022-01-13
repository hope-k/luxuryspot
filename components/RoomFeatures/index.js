import React, {useState, useEffect} from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { duration } from 'moment'

const container = {
    show: {
        transition: {
            staggerChildren: .35
        }
    }
}

const showItem = {
    hidden: {
        opacity: 0,
        y:11
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'linear',
            duration: .8

        }
    }
}
const hrVariant = {
    hidden: {
        width: 0
    },
    show: {
        width: '20rem',
        transition: {
            type: 'linear',
            duration: .8

        }
    }

}




const RoomFeatures = ({ room }) => {
    const { ref, inView } = useInView();
    const controls = useAnimation();
    useEffect(() => {
        if(inView){
            controls.start('show')
        }
        if(!inView){
            controls.start('hidden')
        }
    })


    const { guestCapacity, internet, numOfBeds, breakfast, airConditioned, petsAllowed, roomCleaning } = room
    return (
        <div className="features mt-5">
            <h3 className='mb-4'>Features:</h3>
            <motion.div initial='hidden' animate={controls} ref={ref} variants={container}>
                <motion.div className='room-feature' variants={showItem}>
                    <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                    <p>{guestCapacity} Guests</p>
                </motion.div>

                <motion.div className='room-feature' variants={showItem}>
                    <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                    <p>{numOfBeds} Beds</p>
                </motion.div>

                <motion.div className='room-feature' variants={showItem}>
                    <i className={breakfast ? 'fa fa-check text-success' : 'fa fa-times text-danger'} aria-hidden="true"></i>
                    <p>Breakfast</p>
                </motion.div>
                <motion.div className='room-feature' variants={showItem}>
                    <i className={internet ? 'fa fa-check text-success' : 'fa fa-times text-danger'} aria-hidden="true"></i>
                    <p>Internet</p>
                </motion.div>
                <motion.div className='room-feature' variants={showItem}>
                    <i className={airConditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'} aria-hidden="true"></i>
                    <p>Air Conditioned</p>
                </motion.div>

                <motion.div className='room-feature' variants={showItem}>
                    <i className={petsAllowed ? 'fa fa-check text-success' : 'fa fa-times text-danger'} aria-hidden="true"></i>
                    <p>Pets Allowed</p>
                </motion.div>

                <motion.div className='room-feature' variants={showItem}>
                    <i className={roomCleaning ? 'fa fa-check text-success' : 'fa fa-times text-danger'} aria-hidden="true"></i>
                    <p>Room Cleaning</p>
                </motion.div>
                <motion.hr variants={hrVariant}/>

            </motion.div>



        </div>
    )
}

export default RoomFeatures
