import React from 'react'
import Layout from '../../components/Layout';
import Register from '../../components/Register';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react'


export default function RegisterPage() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])
    return (
        <>

            <div className="gradientBackground"></div>
            {
                loaded 
            }
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