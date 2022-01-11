import { dbConnect } from '../../../../backend/dbConfig/dbConnect';
import { allAdminBookings } from '../../../../backend/controllers/bookingControllers';
import nc from 'next-connect';
import onError from '../../../../backend/middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from '../../../../backend/middlewares/auth';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticatedUser, authorizeRoles('admin') ).get(allAdminBookings);





export default handler;
