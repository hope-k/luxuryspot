import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import { registerUser } from '../../../backend/controllers/authControllers';
import nc from 'next-connect';
import onError from '../../../backend/middlewares/errors';
const handler = nc({ onError });

dbConnect();



handler.post(registerUser);





export default handler;
