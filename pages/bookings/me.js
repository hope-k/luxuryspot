import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../components/Layout';
import { MyBookings } from '../../components/MyBookings';
import { wrapper } from '../../redux/store';
import {getMyBookings} from '../../redux/Slice/myBookingsSlice'

const MyBookingsPage = () => {
    return (
        <Layout title='My Bookings'>
            <MyBookings />
        </Layout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => 
    async ({ req }) => {
        const session = await getSession({ req });
        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }

            }
        }
        const bookingObj = {
            authCookie: req.headers.cookie,
            req: req
        }
        await store.dispatch(getMyBookings(bookingObj))
        return {
            props: { session }
        }
    }


)


export default MyBookingsPage
