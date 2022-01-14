import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearRoomError } from '../../redux/Slice/roomSlice';
import Head from 'next/head'
import ReactCarousel from '../ReactCarousel';
import RoomFeatures from '../RoomFeatures';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { NEXT_URL } from '../../config/config';
import { useRouter } from 'next/router';
import { checkAvailability, clearCheckAvailabilityError, resetIsAvailable } from '../../redux/Slice/roomAvailableCheckSlice';
import { getBookedDates } from '../../redux/Slice/bookedDatesSlice';
import { PaystackButton } from 'react-paystack';
import { notification } from 'antd';
import NewReview from '../NewReview/index';
import ListReviews from '../ListReviews';
import { Alert } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimateSharedLayout } from "framer-motion"


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
        y: 11
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

const RoomDetails = () => {
    const PaystackButtonMotion = motion(PaystackButton)
    const { ref, inView } = useInView();
    const controls = useAnimation();
    const router = useRouter()
    const dispatch = useDispatch();
    const { id } = router.query //room id
    const { room, error: roomError } = useSelector(state => state.room);
    const { images, _id, name, pricePerNight, ratings, numOfReviews, address, description, reviews } = room
    const { isAvailable, loading: bookingLoading } = useSelector(state => state.roomAvailability)
    const { bookedDates } = useSelector(state => state.bookedDates)
    const { user } = useSelector(state => state.currentUser)
    const [bookingError, setBookingError] = useState(null)
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();
    useEffect(() => {
        if (inView) {
            controls.start('show')
        }
        if (!inView) {
            controls.start('hidden')
        }
    }, [inView, controls])

    //booked dates to pass into the datepicker for it to excluded 
    const alreadyBookedDates = [];
    bookedDates.forEach((dates) => {
        alreadyBookedDates.push(new Date(dates))

    })



    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates;
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate)
        if (checkInDate && checkOutDate) { //check room availability when booking dates are selected
            //calc days of stay
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1) //add 1 because because the original result automatically subtracts 1
            setDaysOfStay(days);
            const checkObj = {
                id: id,
                checkInDate: checkInDate.toISOString(),
                checkOutDate: checkOutDate.toISOString()
            }
            dispatch(checkAvailability(checkObj)); //checking availability


        }

    }
    const newBookingHandler = async () => {
        const bookingData = {
            room: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: (daysOfStay * pricePerNight),
            paidAt: Date.now(),
            paymentInfo: {
                id: new Date().getTime().toString(),
                status: 'PAID'
            }
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${NEXT_URL}/api/bookings`, bookingData, config)
            if (data.error) {
                setBookingError(data.error)
            }


        } catch (error) {

        }

    }





    useEffect(() => {
        dispatch(getBookedDates(id))
        if (roomError) {
            toast.error(roomError, { theme: 'colored' })
            dispatch(clearRoomError())
        }
        if (bookingError) {
            toast.error(bookingError, { theme: 'colored' });
            setBookingError(null);
        }
        return () => { dispatch(resetIsAvailable()) }


    }, [dispatch, roomError, bookingError, id])
    const paystackConfig = {

        email: user?.email,
        amount: (daysOfStay * pricePerNight) * 100,
        publicKey: process.env.PAYSTACK_API_KEY,
        currency: 'GHS',
        metadata: { checkInDate: checkInDate, checkOutDate: checkOutDate, daysOfStay: daysOfStay },
        firstname: user?.name,
        onSuccess: () => {
            newBookingHandler();
            notification.success({ message: 'Booking Successful', description: `Payment of GHS ${(daysOfStay * pricePerNight)} was successful`, placement: 'topRight' });
            router.push('/bookings/me');

        },
        onClose: () => toast.error('Payment Not Successful - You closed the payment portal', { theme: 'colored', style: { borderRadius: '2rem' }, })



    }

    return (
        <>

            <Head>
                <title>{name}</title>
            </Head>
            <div>
                <div className="container container-fluid">
                    <motion.h2 animate={{ y: [10, 0], opacity: [0, 1], transition: { type: 'linear', duration: 1 } }} className='mt-5 rale fw-bold'>{name}</motion.h2>
                    <motion.p animate={{ y: [10, 0], opacity: [0, 1], transition: { type: 'linear', duration: 1, delay: .5 } }}>{address}</motion.p>
                    <div className="ratings mt-auto mb-3">
                        <div className="rating-outer">
                            <div className="rating-inner"
                                style={{ width: `${(ratings / 5) * 100}%` }}
                            >

                            </div>
                        </div>
                        <span id="no_of_reviews">({numOfReviews} Reviews)</span>
                    </div>
                    <ReactCarousel images={images} name={name} />

                    <div className="row my-5">
                        <motion.div className="col-12 col-md-6 col-lg-8 rale fw-bold" initial='hidden' animate={controls} variants={container} ref={ref}>
                            <motion.h2 className='fw-bold'
                                variants={showItem}
                            >Description
                            </motion.h2>
                            <motion.p
                                variants={showItem}
                                transition={{ type: 'easeInOut', duration: .35 }}
                            >
                                {description}
                            </motion.p>
                            <RoomFeatures room={room} />
                        </motion.div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <AnimateSharedLayout>
                                <motion.div layout className="booking-card shadow-lg p-4">
                                    <p className='price-per-night'><b className='fw-normal'>GHS {pricePerNight}</b> / <span className='fw-light'>night</span></p>
                                    <hr />
                                    <h4 className="mt-5 mb-3 fw-light">
                                        Pick <span className='text-deep-blue fw-normal'>Check In</span>  & <span className='text-info fw-normal'>Check Out</span> Date
                                    </h4>
                                    <DatePicker
                                        className='w-100'
                                        selected={checkInDate}
                                        onChange={onChange}
                                        startDate={checkInDate}
                                        endDate={checkOutDate}
                                        minDate={new Date()}
                                        excludeDates={alreadyBookedDates}
                                        selectsRange
                                        inline

                                    />
                                    {
                                        isAvailable === true &&
                                        <motion.div animate={{ y: [-11, 0], opacity: [0, 1] }} transition={{ ease: [.6, .01, -.05, .95], duration: 1 }} className="alert alert-success my-3 addRadius rale fw-bold">
                                            Room is Available. Book now!.
                                        </motion.div>
                                    }
                                    {
                                        isAvailable === 'Not Available' && <motion.div animate={{ y: [-11, 0], opacity: [0, 1] }} transition={{ ease: [.6, .01, -.05, .95], duration: 1 }} className="alert alert-danger my-3 fw-normal addRadius">
                                            Room not Available. Try different Date.
                                        </motion.div>
                                    }
                                    {
                                        isAvailable === true && !user &&
                                        <motion.div animate={{ y: [-11, 0], opacity: [0, 1] }} transition={{ ease: [.6, .01, -.05, .95], duration: 1 }} className="alert alert-danger my-3 fw-normal addRadius">
                                            Login to book room
                                        </motion.div>
                                    }
                                    {
                                        isAvailable === true && user &&
                                        <PaystackButtonMotion
                                            animate={{ y: [22, 0], opacity: [0, 1] }}
                                            transition={{ ease: [.6, .01, -.05, .95], duration: 1.8 }}
                                            {...paystackConfig}
                                            className="btn btn-block py-3 booking-btn " onClick={() => newBookingHandler()}
                                        >Pay - GHS {daysOfStay * pricePerNight} - {daysOfStay} Day(s)

                                        </PaystackButtonMotion>

                                    }


                                </motion.div>
                            </AnimateSharedLayout>
                        </div>
                    </div>


                    <div className='d-flex row'>
                        <NewReview />
                    </div>
                    {
                        reviews && reviews.length > 0 ? <ListReviews reviews={reviews} /> : <Alert message="- No Reviews on this room" type="info" className='addRadius fw-normal' />
                    }
                </div>


            </div>
        </>

    )
}

export default RoomDetails
