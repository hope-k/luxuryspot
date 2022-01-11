import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import { wrapper } from '../../../redux/store';
import BookingDetail from '../../../components/BookingDetail';
import { getMyBookingsDetail } from '../../../redux/Slice/myBookingsDetailSlice';

const MyBookingsPage = () => {
    return (
        <Layout title='Booking Details'>
            <BookingDetail />
        </Layout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async ({ req, params }) => {
        const session = await getSession({ req });
        if (!session || session.user.role !== 'admin') {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }

            }
        }
        const thunkObj = { authCookie: req.headers.cookie, id: params.id }
        await store.dispatch(getMyBookingsDetail(thunkObj))
        return {
            props: { session }
        }
    }


)


export default MyBookingsPage
