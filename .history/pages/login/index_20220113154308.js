import React, { useState, useEffect } from 'react'
import Login from '../../components/Login/Login'
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react'

export default function LoginPage() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (document.readyState !== 'loading') {
            setLoaded(true);
        }
    }, []);
    return (
        <>
            {
                loaded ? (
                    <>
                        <div className="gradientBackground"></div>
                        <Layout title='Sign In'>
                            <Login />
                        </Layout>
                    </>

                ) : ''
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


