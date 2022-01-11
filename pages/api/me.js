import { dbConnect } from '../../backend/dbConfig/dbConnect';
import { currentUserProfile } from '../../backend/controllers/authControllers';
import nc from 'next-connect';
import onError from '../../backend/middlewares/errors';
import { isAuthenticatedUser } from '../../backend/middlewares/auth';


const handler = nc({ onError });
dbConnect();



handler.use(isAuthenticatedUser).get(currentUserProfile);





export default handler;
