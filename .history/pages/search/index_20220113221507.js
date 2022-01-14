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
                    <div style={{ backgroundImage: "url(/images/searchbg.jpg)", width: '100%', height: '1120px', position: 'abs' }} >

                    </div>
                    <Layout title='Search Rooms'>
                        <Search />
                    </Layout>
                </>
            }
        </>
    )
}