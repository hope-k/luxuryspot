import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
import { updateUserProfile } from '../../../backend/controllers/authControllers';
import { isAuthenticatedUser } from '../../../backend/middlewares/auth';
const handler = nc({ onError });
dbConnect();



handler
.use(isAuthenticatedUser)
.put(updateUserProfile);





export default handler;
