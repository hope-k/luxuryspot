import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth'
import onError from '../../../backend/middlewares/errors';
const handler = nc({ onError });
import { createRoomReview, getRoomReviews, deleteRoomReviews} from '../../../backend/controllers/roomControllers'


dbConnect();



handler.use(isAuthenticatedUser).put(createRoomReview)
handler.use(isAuthenticatedUser).get(getRoomReviews)
handler.use(isAuthenticatedUser).delete(deleteRoomReviews)



export default handler;
