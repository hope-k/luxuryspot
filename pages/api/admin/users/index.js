import { dbConnect } from '../../../../backend/dbConfig/dbConnect';
import { allAdminUsers } from '../../../../backend/controllers/authControllers';
import nc from 'next-connect';
import onError from '../../../../backend/middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from '../../../../backend/middlewares/auth';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminUsers);





export default handler;
