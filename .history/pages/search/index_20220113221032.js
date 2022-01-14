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
                <div></div>
                <Layout title='Search Rooms' >
                    <Search />
                </Layout>
                </>
            }
        </>
    )
}