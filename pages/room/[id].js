import Layout from '../../components/Layout';
import RoomDetails from '../../components/RoomDetails';
import { getRoom } from '../../redux/Slice/roomSlice';
import { wrapper } from '../../redux/store';
export default function Index() {
  return (
    <Layout title='Room Details'>
      <RoomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({ req, params: {id} }) => {
      const reqIdObj = {id: id, req: req}
    await store.dispatch(getRoom(reqIdObj))

  }
)



