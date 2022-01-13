import Search from "../../components/Search";
import Layout from "../../components/Layout";
import React, { useState, useEffect } from 'react'



export default function Index() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (document.readyState !== 'loading') {
            setLoaded(true)
        }
    }, []);
    return (
        <>
            {
                loaded  (
                    <>
                        <div className="searchBackground"></div>
                        <Layout title='Search Rooms'>
                            <Search />
                        </Layout>
                    </>

                )
            }
        </>

    )
}