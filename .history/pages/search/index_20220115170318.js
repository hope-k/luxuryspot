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


            <Image
                width={1100}
                hei
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266318/bg_ffc9wn.jpg'
                className="searchBackground"
            />
            <Layout title='Search Rooms'>
                <Search />
            </Layout>

        </>
    )
}