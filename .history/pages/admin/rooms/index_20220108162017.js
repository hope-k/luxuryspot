import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import AllRooms from '../../../components/Admin/AllRooms';


const AllAdminRooms = () => {
    return (
        <Layout title='Admin All Rooms'>
            <AllRooms />
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
export default AllAdminRooms
