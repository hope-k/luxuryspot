import React from 'react'
import Layout from '../../components/Layout';
import ForgotPassword from '../../components/ForgotPassword';


export default function ForgotPasswordPage() {
    return (
        <>
            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289448/photo-1553095066-5014bc7b7f2d_dvei0d.jpg'
                className="searchBackground"
            />
            <Layout title='Forgot Password'>
                <ForgotPassword />
            </Layout>
        </>
    )
}


