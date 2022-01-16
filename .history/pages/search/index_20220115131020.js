import Search from "../../components/Search";
import Layout from "../../components/Layout";
import { useState, useEffect } from 'react'



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
                            src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266318/bg_ffc9wn.jpg'
                            className="gradientBackground"
                        />
                        <Login />
                        <Search />
                    </Layout>
                </>
            }
        </>
    )
}