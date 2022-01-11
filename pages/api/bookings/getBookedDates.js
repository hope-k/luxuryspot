import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
import { getBookedDatesOfRoom } from '../../../backend/controllers/bookingControllers';
const handler = nc({ onError });
dbConnect();



handler.get(getBookedDatesOfRoom);





export default handler;
