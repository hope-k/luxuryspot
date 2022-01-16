import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import UpdateRoom from '../../../components/UpdateRoom/index'


const UpdateRoomPage = () => {
    return (
        <>

            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289259/green-background-3d-render-picture-id1226478926_z4wulb.jpg'
                className="searchBackground"
            />
            <Layout title='Update Room'>
                <UpdateRoom />
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
        props: {}
    }
}
export default UpdateRoomPage;
