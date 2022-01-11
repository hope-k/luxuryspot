import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'



const variants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1,  scale: 1},
    exit: { opacity: 0, scale: 0 },
}

const Layout = ({ children, title = 'Book Best Apartments' }) => {
    return (
        <>
            <motion.main
                variants={variants}
                initial='hidden'
                animate='show'
                exit='exit'
                transition={{ type: 'linear', duration: .25,}}
            >
                <Head>
                    <title>{title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0' />
                </Head>
                <Header />
                <ToastContainer position='bottom-right' transition={Flip} />
                {children}
                <Footer />
            </motion.main>


        </>

    )

}
export default Layout;
