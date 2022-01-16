import React from 'react'
import { getSession } from 'next-auth/react'
import UpdateProfile from '../../components/ProfileUpdate';
import Layout from '../../components/Layout';
const UpdateProfilePage = () => {
    return (
        <>
            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289259/green-background-3d-render-picture-id1226478926_z4wulb.jpg'
                className="searchBackground"
            />
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
