import Search from "../../components/Search";
import Layout from "../../components/Layout";



export default function Index() {
    
    return (
        <>
            <div className="searchBackground"></div>
            <Layout title='Search Rooms'>
                <Search />
            </Layout>
        </>
    )
}