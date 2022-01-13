import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter Room Name'],
        trim: true,
        maxLength: [100, 'Cannot exceed 100 characters']
    },

    pricePerNight: {
        type: Number,
        required: [true, 'Enter Room Price Per Night'],
        maxLength: [4, 'Cannot exceed 4 characters'],
        default: 0.00
    },

    description: {
        type: String,
        required: [true, 'Enter Room Description'],
    },

    address: {
        type: String,
        required: [true, 'Enter Room Address'],
    },

    guestCapacity: {
        type: Number,
        required: [true, 'Enter Room Capacity'],
    },

    numOfBeds: {
        type: Number,
        required: [true, 'Enter Number Of Beds In Room'],
    },

    internet: {
        type: Boolean,
        default: false
    },
    breakfast: {
        type: Boolean,
        default: false
    },
    airConditioned: {
        type: Boolean,
        default: false
    },
    petsAllowed: {
        type: Boolean,
        default: false
    },
    roomCleaning: {
        type: Boolean,
        default: false
    },

    ratings: {
        type: Number,
        default: 0
    },

    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },

            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Enter Room Category'],
        enum: {
            values: ['King', 'Single', 'Twins'],
            message: 'Select Room Category'
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
            }



        }


    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },







},

    {
        timestamps: true
    }


);


export default mongoose.models.Room || mongoose.model('Room', roomSchema);