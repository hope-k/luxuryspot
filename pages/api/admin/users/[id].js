import { dbConnect } from '../../../../backend/dbConfig/dbConnect';
import nc from 'next-connect';
import onError from '../../../../backend/middlewares/errors';
import { isAuthenticatedUser, authorizeRoles } from '../../../../backend/middlewares/auth';
import { getUserDetails, updateUserDetails, deleteUser } from '../../../../backend/controllers/authControllers';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUserDetails);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser);





export default handler;
