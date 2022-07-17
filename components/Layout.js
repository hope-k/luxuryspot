import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'



const variants = {
    hidden: { opacity: 0, scale: 1.05 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
}

const Layout = ({ children, title = 'Book Best Apartments' }) => {
    return (
        <>
            <div className='layoutContainer'>

                <motion.main
                    variants={variants}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    transition={{ ease: [.6, .01, -.05, .95], duration: .65 }}
                >
                    <Head>
                        <title>{title}</title>
                        <meta charSet='utf-8' />
                        <meta name='viewport' content='initial-scale=1.0' />
                    </Head>
                    <Header />
                    <ToastContainer position='top-center' transition={Slide} />
                        {children}
                    <Footer />
                </motion.main>


            </div>
        </>

    )

}
export default Layout;
