import React from 'react'
import NotFound from '../components/404Page';
import Layout from '../components/Layout'


const NotFoundPage = () => {
    return (
        <Layout title='Page Not Found'>
            <NotFound />
        </Layout>
    )
}

export default NotFoundPage;
