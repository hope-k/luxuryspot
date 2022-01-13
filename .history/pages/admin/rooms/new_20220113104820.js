import React from 'react'
import { getSession } from 'next-auth/react'
import Layout from '../../../components/Layout';
import NewRoom from '../../../components/NewRoom/index'

const NewRoomPage = () => {
    return (
        
        <Layout title='Create New Room'>
            <NewRoom />
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
export default NewRoomPage;
