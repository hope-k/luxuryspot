import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import AllUsers from '../../../components/Admin/AllUsers';


const AllAdminUsers = () => {
    return (
        <Layout title='Admin All Users'>
            <AllUsers />
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
export default AllAdminUsers
