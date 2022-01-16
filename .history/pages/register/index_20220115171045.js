import React from 'react'
import Layout from '../../components/Layout';
import Register from '../../components/Register';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function RegisterPage() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])
    return (
        <>


            <Layout title='Sign Up'>
                <img
                    layout='fill'
                    src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266318/bg_ffc9wn.jpg'
                    className="gradientBackground"
                />
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