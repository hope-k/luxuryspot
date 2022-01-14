import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import { getallAdminRooms, clearAdminRoomsError } from '../../redux/Slice/allAdminRoomsSlice';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash, BsPlusCircleDotted } from 'react-icons/bs'
import Loader from '../layout/Loader'
import { deleteRoom, clearDeleteRoomError, resetDeleteRoom } from '../../redux/Slice/deleteRoomSlice';
import { motion } from 'framer-motion'



const AllRooms = () => {
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, rooms } = useSelector(state => state.allAdminRooms)
    const { error: deleteError, success: deleteSuccess } = useSelector(state => state.deleteRoom)
    useEffect(() => {
        dispatch(getallAdminRooms())
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearAdminRoomsError())
        }
        if (deleteSuccess) {
            toast.success('Room Deleted Successfully', { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetDeleteRoom());
        }
        if (deleteError) {
            toast.error(deleteError, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearDeleteRoomError())
        }
    }, [dispatch, error, deleteError, deleteSuccess])


    const options = {
        filterType: 'multiselect',
        download: true,
        responsive: 'simple',
        elevation: 0,
        sortOrder: {
            name: 'roomId',
            direction: 'desc'
        }

    }
    const deleteRoomHandler = (id) => {
        dispatch(deleteRoom(id))
    }
    const dataSource = [];
    rooms && rooms.forEach(room => {
        dataSource.push({
            roomId: room._id,
            name: room.name,
            pricePerNight: `GHS ${room.pricePerNight}`,
            category: room.category,
            actions:
                <>
                    <div className='ml-4'>
                        <Link href={`/admin/rooms/${room._id}`}>
                            <AiOutlineEdit style={{ fontSize: '1rem', cursor: 'pointer' }} />
                        </Link>


                        <BsTrash onClick={() => deleteRoomHandler(room._id)} style={{ fontSize: '1rem', color: 'red' }} className='pointer ml-4' />


                    </div>
                </>



        })
    });


    const columns = [
        {
            name: 'roomId',
            label: 'Room ID',
            options: {
                setCellProps: () => ({ style: {} }),
                filter: true,
                sort: true,

            }



        },
        {
            name: 'name',
            label: 'Name',
            options: {
                setCellProps: () => ({ style: { color: 'green' } }),
                filter: true,
                sort: true
            }

        },
        {
            name: 'pricePerNight',
            label: 'Price / Night',
            options: {
                setCellProps: () => ({ style: { color: 'blue' } }),
                filter: true,
                sort: true
            }

        },
        {
            name: 'category',
            label: 'Category',
            options: {
                customBodyRender: (data, type, row) => { return <b className='ml-3'>{data}</b> },
                filter: true,
                sort: true

            },



        },
        {
            name: 'actions',
            label: 'Edit / Delete',
            options: {
                download: false


            }
        }

    ]
    useEffect(() => {
        setReady(true)
    }, [])

    return (
        <div className='container container-fluid'>

            {
                loading ? <Loader /> :
                    <>
                        <div className='admin-header'>
                            <h1 className='my-5 fw-bold rale'>{`${rooms && rooms.length} Rooms`}

                                <Link href='/admin/rooms/new' pass>
                                    <a href="" className="mt-0 btn text-white float-right new-room-btn fw-normal">
                                        Create Room <BsPlusCircleDotted className='mb-1' />
                                    </a>
                                </Link>
                            </h1>

                        </div>
                        {
                            ready && <MUIDataTable title={'Admin Control'} columns={columns} data={dataSource} options={options} className='px-3 addRadius rale' />
                        }
                    </>
            }

        </div>
    )
}

export default AllRooms
