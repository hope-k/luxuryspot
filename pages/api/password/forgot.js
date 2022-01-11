import nc from 'next-connect';
import { dbConnect } from '../../../backend/dbConfig/dbConnect';
import onError from '../../../backend/middlewares/errors';
import { forgotPassword } from '../../../backend/controllers/authControllers';
dbConnect();


const handler = nc({ onError });


handler.post(forgotPassword);




export default handler;
