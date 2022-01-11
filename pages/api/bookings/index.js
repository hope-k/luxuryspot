import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
import { createBooking } from '../../../backend/controllers/bookingControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
const handler = nc({ onError });
dbConnect();



handler.use(isAuthenticatedUser).post(createBooking);





export default handler;
