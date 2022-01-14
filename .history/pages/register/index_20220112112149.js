import React from 'react'
import Layout from '../../components/Layout';
import Register from '../../components/Register';
import { getSession } from 'next-auth/react';


export default function RegisterPage() {
    return (
        <>
            <div className="gradientBackground"></div>
                <Layout title='Sign Up'>
                    <Register />
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