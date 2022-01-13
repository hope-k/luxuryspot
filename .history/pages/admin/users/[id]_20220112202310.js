import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import UpdUpdateUserDetailsateUser from '../../../components/Admin/updateUserDetails';


const UpdateUserPage = () => {
    return (
        <Layout title='Update User Role'>
            <UpdateUserDetails />
        </Layout>
    )
}
export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }

        }
    }
    return {
        props: {}
    }
}
export default UpdateUserPage;
