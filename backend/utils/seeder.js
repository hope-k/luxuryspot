const mongoose = require('mongoose');
const Room = require('../models/room');
const rooms = require('../data/rooms.json');


mongoose.connect('mongodb+srv://hope21x:kumordzie@cluster0.ufgdy.mongodb.net/luxurySpot?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const roomSeed = async () => {
    try {
        await Room.deleteMany()
        console.log('-----!!!Rooms deleted!!!!');
        await Room.insertMany(rooms);
        console.log('-----Rooms added');
        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}
roomSeed();

