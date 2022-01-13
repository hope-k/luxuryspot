import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import AllBookings from '../../../components/Admin/ABookings';


const AllAdminBookingsPage = () => {
    return (
        <Layout title='Admin All Bookings'>
            <AllBookings />
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
export default AllAdminBookingsPage
