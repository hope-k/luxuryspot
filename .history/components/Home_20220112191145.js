import React, { useEffect } from 'react'
import RoomItem from './RoomItem';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../redux/Slice/allRoomsSlice';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Alert } from 'antd';
import { MdEventAvailable } from 'react-icons/md'
import { motion } from 'framer-motion'
import  CustomIntro  from '../'



const MotionCalender = motion(MdEventAvailable)



const Home = () => {


    const router = useRouter()
    let { page = 1, location } = router.query
    page = +page
    const dispatch = useDispatch()
    const { rooms, error, resPerPage, roomCount, filteredRoomCount, currentPageRoomCount } = useSelector(state => state.allRooms)
    useEffect(() => {
        toast.error(error, { theme: 'colored' })
        dispatch(clearError())
    }, [])

    const handlePagination = (pageNumber) => {
        window.location.href = `/?page=${pageNumber}`

    }
    let count = roomCount;
    if (location) {
        count = filteredRoomCount
    }


    return (
        <motion.div>


            <section id="rooms" className="container mt-5">

                <motion.h2 className='mb-3 ml-2 stays-heading fw-bold rale'>{location ? `Rooms in '${location}'` : `Available Rooms`} <MotionCalender transition={{type: 'linear', duration: 4}} animate={{opacity:[0, 1, 0]}}/></motion.h2>

                <Link href='/search' >
                    <a className='ml-2 back-to-search rale'><i className='fa fa-arrow-left'></i> Search Rooms </a>
                </Link>
                <div className="row">
                    {
                        rooms && rooms.length === 0 ?
                            (

                                <Alert
                                    message="No Rooms Found!"
                                    description="This can be due to poor internet connection. Try refresh!"
                                    type="error"
                                    closable
                                    className='m-5 addRadius'
                                />
                            )
                            :
                            (
                                rooms?.map((room) => (
                                    <>
                                        <CustomIntro/>
                                        <RoomItem key={room._id} room={room} />

                                    </>
                                
                                ))
                            )

                    }

                </div>


            </section>

            {
                resPerPage < count &&
                <div className="d-flex justify-content-center mt-5">

                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomCount}
                        onChange={handlePagination}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'



                    />
                </div>
            }
        </motion.div>

    )
}
export default Home;
