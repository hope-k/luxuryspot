import mongoose from 'mongoose';

export const dbConnect = () => {

    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

