import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { clearMyBookingsError, getMyBookings } from '../../redux/Slice/myBookingsSlice'
import MUIDataTable from 'mui-datatables'
import Link from 'next/link'
import easyinvoice from 'easyinvoice'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Alert, notification } from 'antd';
import { BsTrash, BsPlusCircleDotted } from 'react-icons/bs'
import Loader from '../layout/Loader'
import { getRoomReviews } from '../../redux/Slice/getRoomReviewsSlice';
import { deleteReview, clearDeleteReviewError, resetDeleteReview } from '../../redux/Slice/deleteReviewSlice';


const RoomReviews = () => {
    const [ready, setReady] = useState(false)
    const [roomId, setRoomId] = useState('')
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, reviews } = useSelector(state => state.roomReviews);
    const { success: deleteSuccess, error: deleteError} = useSelector(state => state.deleteReview)
    useEffect(() => {
        notification
        if (roomId !== '') {
            dispatch(getRoomReviews(roomId))
        }
        if (deleteSuccess) {
            toast.success('Review Deleted Successfully', { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetDeleteReview());
        }
        if (deleteError) {
            toast.error(deleteError, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearDeleteReviewError())
        }
    }, [dispatch, roomId, deleteError, deleteSuccess])


    const options = {
        filterType: 'multiselect',
        download: true,
        responsive: 'simple',
        elevation: 0,
        sortOrder: {
            name: 'id',
            direction: 'desc'
        }

    }
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview({id: id, roomId: roomId}))
    }
    const dataSource = [];
    reviews && reviews.forEach(review => {
        dataSource.push({
            id: review._id,
            rating: review.rating,
            comment: review.comment,
            user: review.name,
            actions:
                <>
                    <div className='ml-4'>

                        <BsTrash onClick={() => deleteReviewHandler(review._id)} style={{ fontSize: '1rem', color: 'red' }} className='pointer ml-4' />

                    </div>
                </>



        })
    });


    const columns = [
        {
            name: 'id',
            label: 'Review ID',
            options: {
                filter: true,
                sort: true,

            }



        },
        {
            name: 'rating',
            label: 'Rating',
            options: {
                filter: true,
                sort: true
            }

        },
        {
            name: 'comment',
            label: 'Comment',
            options: {
                filter: true,
                sort: true
            }

        },
        {
            name: 'user',
            label: 'User',
            options: {
                customBodyRender: (data, type, row) => { return <b className='ml-3'>{data}</b> },
                filter: true,
                sort: true

            },



        },
        {
            name: 'actions',
            label: 'Delete',
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
            <div className="row justify-content-center mt-5">
                <div className="div col-5">
                    <form>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="room_id_field">Enter Room ID</label>
                            <input
                                type="room_id"
                                id="room_id_field"
                                className="form-control addRadius"
                                value={roomId}
                                name='room_id'
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {
                    reviews && reviews.length > 0 ?
                        <>
                            {
                                loading ? <Loader /> :
                                    <>
                                        <h1 className='my-5 fw-bold rale admin-header'>{`${reviews && reviews.length} Reviews`}</h1>
                                        {
                                            ready && <MUIDataTable title={'Reviews'} columns={columns} data={dataSource} options={options} className='px-3 addRadius rale' />
                                        }
                                    </>
                            }

                        </>
                        :

                        <Alert
                            message='- No Reviews'
                            className='addRadius p-3'
                            type='info'
                        />

                }

            </div>



        </div>
    )
}

export default RoomReviews 
