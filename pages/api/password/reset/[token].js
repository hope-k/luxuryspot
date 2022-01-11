import { dbConnect } from '../../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../../backend/middlewares/errors';
import { resetPassword } from '../../../../backend/controllers/authControllers';
const handler = nc({ onError });
dbConnect();



handler.put(resetPassword);





export default handler;
