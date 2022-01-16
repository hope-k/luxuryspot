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
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289259/green-background-3d-render-picture-id1226478926_z4wulb.jpg'
                className="searchBackground"
            />
            <Layout title='Search Rooms'>
                <Search />
            </Layout>

        </>
    )
}