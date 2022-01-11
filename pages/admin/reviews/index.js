import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import RoomReviews from '../../../components/Admin/RoomReviews';


const ReviewsPage = () => {
    return (
        <Layout title='Reviews'>
            <RoomReviews />
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
export default ReviewsPage
