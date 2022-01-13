import React from 'react'
import Layout from '../../components/Layout';
import ForgotPassword from '../../components/ForgotPassword';


export default function ForgotPasswordPage() {
    return (
        <>
            <div className="searchBackground"></div>

            <Layout title='Forgot Password'>
                <ForgotPassword />
            </Layout>
        </>
    )
}


