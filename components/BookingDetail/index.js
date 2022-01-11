import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables'
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import Link from 'next/link'
import Image from 'next/image'
import { getMyBookingsDetail, clearMyBookingsDetailError } from '../../redux/Slice/myBookingsDetailSlice';
import { BsInfoCircle } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { BsCashCoin } from 'react-icons/bs'
import moment from 'moment'
import { useSession } from 'next-auth/react'


const BookingDetail = () => {
    const { data: session } = useSession()
    const { user } = session;
    const dispatch = useDispatch();
    const { error, myBookingsDetail } = useSelector(state => state.myBookingsDetail)
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearMyBookingsDetailError())
        }
    }, [error, dispatch])




    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 booking-details">
                    {
                        myBookingsDetail &&
                        <>
                            <h2 className="my-5">Booking # {myBookingsDetail._id}</h2>

                            <h4 className="mb-4">User Information <FaUserTie /></h4>
                            <p><b>Name:</b> {myBookingsDetail?.user?.name}</p>
                            <p><b>Email:</b> {myBookingsDetail?.user?.email}</p>
                            <p><b>Amount:</b> GHS {myBookingsDetail.amountPaid}</p>

                            <hr />
                            <div>

                            </div>
                            <div className='d-flex'>
                                <h4 className="mb-4">Booking Info <BsInfoCircle /></h4>
                            </div>
                            <div>
                                <p className='text-success'><b>Check In:</b> {moment(myBookingsDetail?.checkInDate).format('LLL')}</p>
                                <p className='text-danger'><b>Check Out:</b> {moment(myBookingsDetail?.checkOutDate).format('LLL')}</p>
                                <p><b>Days of Stay:</b> {myBookingsDetail?.daysOfStay}</p>
                            </div>

                            <hr />

                            <h4 className="my-4">Payment Status <BsCashCoin /></h4>
                            <p className="greenColor"><b>{myBookingsDetail?.paymentInfo?.status}</b></p>
                            { user && user.role === 'admin' && 
                            <>
                                <h4 className="my-4">Payment Id</h4>
                                <p className="redColor"><b># {myBookingsDetail?.paymentInfo?.id}</b></p>
                            </>
                            }
                            <h4 className="mt-5 mb-4">Booked Room:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <Image
                                            src={myBookingsDetail && myBookingsDetail?.room?.images[0]?.url}
                                            alt={myBookingsDetail?.room?.name}
                                            height={50}
                                            width={70}

                                        />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link href={`/room/${myBookingsDetail?.room?._id}`}>{myBookingsDetail?.room?.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>GHS {myBookingsDetail?.room?.pricePerNight}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{myBookingsDetail?.daysOfStay} Day(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookingDetail
