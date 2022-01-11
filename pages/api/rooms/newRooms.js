import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import { newRooms } from '../../../backend/controllers/roomControllers';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
const handler = nc({ onError });
import { isAuthenticatedUser, authorizeRoles } from '../../../backend/middlewares/auth'

dbConnect();


handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRooms);

export default handler;