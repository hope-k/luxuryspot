import React from 'react'
import Login from '../../components/Login/Login'
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react'
import {useState, useEffect} from 'react'

export default function LoginPage() {
    const [loaded, setLoaded] = useState(false);
    useEffect

    return (
        <>
            <div className="gradientBackground">
            </div>
            {
                loaded && 

                <Layout title='Sign In'>
                    <Login />
                </Layout>
            }
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


