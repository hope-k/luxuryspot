import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import { getRoom, updateRoom, deleteRoom } from '../../../backend/controllers/roomControllers';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
const handler = nc({ onError });
import {isAuthenticatedUser, authorizeRoles} from '../../../backend/middlewares/auth'

dbConnect();






//get single room
handler.get(getRoom);


//update room
handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.put(updateRoom); 


//delete room
handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.delete(deleteRoom);









export default handler;
