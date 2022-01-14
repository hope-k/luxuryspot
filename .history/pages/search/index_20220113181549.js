import Search from "../../components/Search";
import Layout from "../../components/Layout";



export default function Index() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])
    
    return (
        <>
            <div className="searchBackground"></div>
            <Layout title='Search Rooms'>
                <Search />
            </Layout>
        </>
    )
}