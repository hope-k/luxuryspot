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
            {
                loaded &&
                <>

                    <Layout title='Search Rooms'>
                        <Image
                            layout='fill'
                            src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266448/searchbg_bh2yaj.jpg'
                            className="gradientBackground"
                        />
                        <Search />
                    </Layout>
                </>
            }
        </>
    )
}