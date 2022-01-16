import React from 'react'
import Layout from '../../../components/Layout';
import ResetPas4sword from '../../../components/ResetPassword';


export default function ForgotPasswordPage() {
    return (
        <>

            <img
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289448/photo-1553095066-5014bc7b7f2d_dvei0d.jpg'
                className="searchBackground"
            />
            <Layout title='Reset Password'>
                <ResetPassword />
            </Layout>
        </>
    )
}


