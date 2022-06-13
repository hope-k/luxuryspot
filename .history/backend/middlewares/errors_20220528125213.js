import { ErrorHandler } from '../utils/errorHandler'

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = { ...err };
    error.message = err.message;
    //the CastError is displayed when a wrong id is used //mongoose wrong ID 
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }
    //handling mongoose validation error 
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message,400);
    }
        res.status(err.statusCode).json({
            success: false,
            error,
            message: error.message,
            stackError: error.stack
        });

}
/*this is a custom middleware passed into next-connect on initialization
the middleware knows to use all the declared variables above because
it is passed in the handler = nc() function ...in express it will be app.use(onError)



this middleware is used to get the error message we want to display on the front-end

*/
