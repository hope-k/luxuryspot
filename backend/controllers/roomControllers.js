import Room from '../models/room';
import { ErrorHandler } from '../utils/errorHandler';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import APIFeatures from '../utils/apiFeatures';
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

//get all the rooms from api/rooms route dir via a get request
const allRooms = asyncErrorHandler(async (req, res) => {
    const resPerPage = 8;
    const roomCount = await Room.countDocuments();
    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter();

    //initially variable rooms displayed passes through the search and filter method
    let rooms = await apiFeatures.query;
    let filteredRoomCount = rooms.length;
    //the variable rooms below is reassigned because it passes through the pagination method
    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query.sort({ _id: -1 });
    const currentPageRoomCount = rooms.length;
    const currentPage = apiFeatures.currentPage;





    res.status(200).json({
        success: true,
        roomCount,
        filteredRoomCount,
        currentPageRoomCount,
        currentPage,
        resPerPage,
        rooms
    });

});



//creates a room(s) document from the request body 
const newRooms = asyncErrorHandler(async (req, res) => {
    try {

        const images = req.body.images;
        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'bookit/rooms',
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });

            req.body.images = imagesLinks;
            req.body.user = req.user._id
        }

        await Room.create(req.body);
        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }


});
//get a single room via a get request from the client 
const getRoom = asyncErrorHandler(async (req, res, next) => {

    try {
        const room = await Room.findById(req.query.id);
        if (!room) {
            return new ErrorHandler('Room not found with this id!!!', 400)(next);

        }

        res.status(200).json({
            success: true,
            room: room

        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});
//update a single or many room(s) via a put request

const updateRoom = asyncErrorHandler(async (req, res) => {
    try {
        const images = req.body.images;
        let imagesLinks = [];
        let room = await Room.findById(req.query.id);
        if (!room) {
            return next(new ErrorHandler('Room not found with this id!!!', 400));
        }
        if (images) {
            // delete old images of the room model
            for (let i = 0; i < room.images.length; i++) {
                await cloudinary.uploader.destroy(room.images[i].public_id)
            }
            //upload new/updated images from req.body
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.uploader.upload(images[i], {
                    folder: 'bookit/rooms'
                });
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
                req.body.images = imagesLinks


            }

        }


        room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false

        });
        res.status(200).json({
            success: true,
            room: room

        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }


});
//delete a document via a delete request 
const deleteRoom = asyncErrorHandler(async (req, res) => {

    try {
        const room = await Room.findById(req.query.id);
        if (!room) {
            return next(new ErrorHandler('Room not found with this id!!!', 400));
        }
        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.uploader.destroy(room.images[i].public_id)
        }
        await room.remove();

        res.status(200).json({
            success: true,
            message: 'Room was successfully removed'
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});
//create new review => /api/reviews
const createRoomReview = asyncErrorHandler(async (req, res) => {
    const { ratings, comment, roomId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(ratings),
        comment: comment,
        createdAt: Date.now()
    }
    try {
        const room = await Room.findById(roomId);
        //check to see if user already has a review. the code below returns a boolean
        const isReviewed = room.reviews.find(
            review => review.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            //update review
            //no need to add user and name since it already exist 
            room.reviews.forEach(review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = ratings;
                    review.createdAt = Date.now()
                }
            })


        } else {
            //create new review
            room.reviews.push(review);
        }
        //taking the average rating in the reviews and setting the ratings in the room model
        room.numOfReviews = room.reviews.length
        room.ratings = room.reviews.reduce((acc, review) => review.rating + acc, 0) / room.reviews.length

        await room.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }



});
//get all rooms - ADMIN => /api/admin/rooms
const allAdminRooms = asyncErrorHandler(async (req, res) => {

    const rooms = await Room.find()

    res.status(200).json({
        success: true,
        rooms: rooms

    });


});
//get all reviews of room - ADMIN => /api/reviews
const getRoomReviews = asyncErrorHandler(async (req, res) => {
    const room = await Room.findById(req.query.id)

    

    res.status(200).json({
        success: true,
        reviews: room.reviews

    });


});
//delete reviews of room - ADMIN => /api/reviews/
const deleteRoomReviews = asyncErrorHandler(async (req, res) => {
    try {
        const room = await Room.findById(req.query.roomId)
        //best to filter because we anted to recalculate the rating since we filtered out the ones we needed from the deleted ones
        const reviews = room.reviews.filter(review => review._id.toString() !== req.query.id.toString())
        const numOfReviews = reviews.length;
        const ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews

        const updateRoom = await Room.findById(req.query.roomId);
        updateRoom.reviews = reviews
        updateRoom.ratings = ratings
        updateRoom.numOfReviews = numOfReviews
        await updateRoom.save()



        res.status(200).json({
            success: true,

        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});


export {
    createRoomReview,
    allRooms,
    newRooms,
    getRoom,
    deleteRoom,
    updateRoom,
    allAdminRooms,
    getRoomReviews,
    deleteRoomReviews


}