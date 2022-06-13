import Home from '../components/Home';
import Layout from '../components/Layout';
import { getallRooms } from '../redux/Slice/allRoomsSlice';
import { wrapper } from '../redux/store';


export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}





//using wrapper to dispatch redux action in get
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({ req, query }) => {
    const queryObj = {req: req, pageNo: query.page, location: query.location, guests: query.guests, category: query.category }
    await store.dispatch(getallRooms(queryObj));

  }
)



