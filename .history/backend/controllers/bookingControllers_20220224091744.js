import Booking from '../models/booking'
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import sendEmail from '../utils/sendEmail';


const moment = extendMoment(Moment)
//create new booking  => /api/bookings
const checkRoomAvailability = asyncErrorHandler(async (req, res) => {

    try {
        let { roomId, checkInDate, checkOutDate } = req.query

        checkInDate = new Date(checkInDate)
        checkOutDate = new Date(checkOutDate)
        //get the range of dates 
        const range = moment.range(moment(checkInDate), moment(checkOutDate));
        const rangeOfDates = Array.from(range.by('day'))
        const bookings = await Booking.find({
            room: roomId,
            $and: [
                {
                    checkInDate: {
                        $lte: checkOutDate   //you can also do $lte: checkOutDate *these are range query
                    }
                },
                {
                    checkOutDate: {
                        $gte: checkInDate //you can also do $gte: checkInDate *these are range query
                    }
                }
            ]

        });


        //check if any booking available for that roomId
        let isAvailable;
        if (bookings && bookings.length === 0) {
            isAvailable = true
        } else {
            isAvailable = 'Not Available'
        }


        res.status(200).json({
            isAvailable: isAvailable,
        })



    } catch (err) {
        res.json({
            error: err.message
        })
    }



});

//create booking  => /api/bookings/
const createBooking = asyncErrorHandler(async (req, res) => {
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paidAt,
        paymentInfo
    } = req.body;


    try {
        const booking = await Booking.create({
            room: room,
            user: req.user._id,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            daysOfStay: daysOfStay,
            amountPaid: amountPaid,
            paidAt: paidAt,
            paymentInfo: paymentInfo,


        });
        const createdBooking = await Booking.findOne({ user: req.user._id, room: room  }).
            populate({
                path: 'user',
                select: 'email name'
            }).
            populate({
                path: 'room',
                select: 'name'
            }).exec(async function(err, booking){
                const userName = booking?.user?.name
                const bookedRoom = booking?.room?.name
                const checkIn = moment(checkInDate).format('LLL');
                const checkOut = moment(checkOutDate).format('LLL');
                function capitalize(name){
                    return name.charAt(0).toUpperCase() 

                }
                const message = `Dear ${userName}, Payment of GHS ${amountPaid} was Successful. \n\n You Booked a ${daysOfStay} day(s) stay at ${bookedRoom}. You are to Check In on ${checkIn} and Check Out on ${checkOut}`
        
        
        
                await sendEmail({
                    email: booking.user.email,
                    subject: 'Room Booking Successful',
                    message: message
                })
            })






        res.status(200).json({
            booking: booking,
            success: true
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});

//get booked dates of a room => /api/bookings/getBookedDates
const getBookedDatesOfRoom = asyncErrorHandler(async (req, res) => {

    try {
        const { roomId } = req.query

        const bookings = await Booking.find({ room: roomId });
        let bookedDates = [];
        bookings.forEach((booking) => {
            const range = moment.range(moment(booking.checkInDate), moment(booking.checkOutDate));
            const dates = Array.from(range.by('day')); // create a new array from the object passed in as a param
            bookedDates = bookedDates.concat(dates)
        })
        res.status(200).json({
            bookedDates: bookedDates

        })





    } catch (err) {
        res.json({
            error: err.message
        })
    }



});

//get all bookings of current user => /api/bookings/me
const myBookings = asyncErrorHandler(async (req, res) => {

    try {
        const bookings = await Booking.find({ user: req.user._id }).
            populate({
                path: 'room',
                select: 'name pricePerNight images',

            }).
            populate({
                path: 'user',
                select: 'name email'
            })


        if (!bookings) {
            throw new Error('Currently Have No Bookings')
        }
        res.status(200).json({
            myBookings: bookings
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});

//get bookings detail of current user => /api/bookings/:id
const getMyBookingsDetail = asyncErrorHandler(async (req, res) => {

    try {
        const bookings = await Booking.findById(req.query.id).
            populate({
                path: 'room',
                select: 'name pricePerNight images'
            }).
            populate({
                path: 'user',
                select: 'name email'
            })
        if (!bookings) {
            throw new Error('Currently Have No Bookings')
        }
        res.status(200).json({
            myBookingsDetail: bookings
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});
//get all bookings of ADMIN => /api/admin/bookings
const allAdminBookings = asyncErrorHandler(async (req, res) => {

    try {
        const bookings = await Booking.find().
            populate({
                path: 'room',
                select: 'name pricePerNight images'
            }).
            populate({
                path: 'user',
                select: 'name email'
            })


        if (!bookings) {
            throw new Error('Currently Have No Bookings')
        }
        res.status(200).json({
            bookings: bookings,
            success: true
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});
//Delete booking of ADMIN => /api/admin/bookings/:id
const deleteBooking = asyncErrorHandler(async (req, res) => {

    try {
        const booking = await Booking.findById(req.query.id)
            .populate({
                path: 'room',
                select: 'name pricePerNight images'
            })
            .populate({
                path: 'user',
                select: 'name email'
            })
        if (!booking) {
            throw new Error('Booking not found with this id')
        }
        await booking.remove();
        res.status(200).json({
            success: true
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});





export {
    getMyBookingsDetail,
    checkRoomAvailability,
    createBooking,
    getBookedDatesOfRoom,
    myBookings,
    allAdminBookings,
    deleteBooking

}