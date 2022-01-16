import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import NewRoom from '../../../components/NewRoom/index'

const NewRoomPage = () => {
    return (
        <>
            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642290331/CSS-Background-Image-Full-Screent-With-background-Image-1024x903_y1tpba.png'
                className="updateBackground"
            />
            <Layout title='Create New Room'>
                <NewRoom />
            </Layout>
        </>
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
        props: {session}
    }
}
export default NewRoomPage;
