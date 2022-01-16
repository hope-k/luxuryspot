import Search from "../../components/Search";
import Layout from "../../components/Layout";
import { useState, useEffect } from 'react'
import Image from 'next/image'


export default function Index() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <>


            <img              
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266343/search-bg_vrtbu0.jpg'
                className=""
            />
            <Layout title='Search Rooms'>
                <Search />
            </Layout>

        </>
    )
}