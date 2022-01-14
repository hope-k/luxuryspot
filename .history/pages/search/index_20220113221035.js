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
                <divstyle={{ backgroundImage: "url(/images/searchbg.jpg)" }} className="searchBackground"></div>
                <Layout title='Search Rooms' >
                    <Search />
                </Layout>
                </>
            }
        </>
    )
}