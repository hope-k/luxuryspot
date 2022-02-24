import mongoose from 'mongoose';

export const dbConnect = () => {

    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

