import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
import { checkRoomAvailability } from '../../../backend/controllers/bookingControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
const handler = nc({ onError });
dbConnect();



handler.get(checkRoomAvailability);





export default handler;
