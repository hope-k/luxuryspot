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
        await store.dispatch(getMyBookings({cookie: req.headers.cookie, req:}))
        return {
            props: { session }
        }
    }


)


export default MyBookingsPage
