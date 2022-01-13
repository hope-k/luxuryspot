import React from 'react'
import { getSession } from 'next-auth/react'
import UpdateProfile from '../../components/ProfileUpdate';
import Layout from '../../components/Layout';
const UpdateProfilePage = () => {
    return (
        <>
        <div className="searchBackground"></div>

        <Layout title='Update Profile'>
            <UpdateProfile />
        </Layout>

        </>
    )
}
export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }

        }
    }
    return {
        props: { session }
    }
}
export default UpdateProfilePage
