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
                            src='https://res.cloudinary.com/hopekumordzie/image/upload/v1641959228/02_2900ChestnutSt_2002_Aimco1920x1121_1920x1121_qznoro.jpg'
                            className="gradientBackground"
                        />
                        <Search />
                    </Layout>
                </>
            }
        </>
    )
}