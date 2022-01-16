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
                src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642289448/photo-1553095066-5014bc7b7f2d_dvei0d.jpg'
                className="searchBackground"
            />
            {
                loaded && (
                    
                )
            }
            <Layout title='Search Rooms'>
                <Search />
            </Layout>

        </>
    )
}