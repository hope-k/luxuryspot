import React from 'react'
import { getSession } from 'next-auth/react'
import UpdateProfile from '../../components/ProfileUpdate';
import Layout from '../../components/Layout';
const UpdateProfilePage = () => {
    return (
        <>
            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289448/photo-1553095066-5014bc7b7f2d_dvei0d.jpg'
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
