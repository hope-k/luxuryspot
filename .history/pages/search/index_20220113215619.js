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
            <img src='/images/searchbg.jpg' className="searchBackground"></img>
            {
                loaded && 
            <Layout title='Search Rooms'>
                <Search />
            </Layout>
            }
        </>
    )
}