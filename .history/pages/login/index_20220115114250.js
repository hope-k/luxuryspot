import React from 'react'
import Login from '../../components/Login/Login'
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image';

export default function LoginPage() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <>
            <Image
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266318/bg_ffc9wn.jpg' className="gradientBackground"
            />

            <Layout title='Sign In'>
                <Login />
            </Layout>

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


