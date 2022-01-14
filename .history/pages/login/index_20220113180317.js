import React from 'react'
import Login from '../../components/Login/Login'
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react'

export default function LoginPage() {
    
    return (
        <>
            <div className="gradientBackground">
            <Layout title='Sign In'>
                <Login />
            </Layout>
            </div>
        </>
    )
}
export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }

        }
    }
    return {
        props: { session }
    }
}


