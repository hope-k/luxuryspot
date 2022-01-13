import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { allAdminBookings, clearAdminBookingsError, resetAdminBookings } from '../../redux/Slice/allAdminBookingsSlice'
import MUIDataTable from 'mui-datatables'
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import Link from 'next/link'
import easyinvoice from 'easyinvoice'
import moment from 'moment'
import Loader from '../layout/Loader'
import { BsTrash} from 'react-icons/bs'
import { deleteBooking, clearDeleteBookingError, resetDeleteBooking } from '../../redux/Slice/deleteBookingSlice';
import { useRouter } from 'next/router';
import {toast} from 'react-toastify'

export const AllBookings = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { bookings, error, loading, success } = useSelector(state => state.allAdminBookings)
    const { error: deleteError, loading: deleteLoading, success: deleteSuccess } = useSelector(state => state.deleteBooking)
    useEffect(() => {
        dispatch(allAdminBookings());
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearAdminBookingsError())
        }         
        if (deleteError) {
            toast.error(deleteError, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearDeleteBookingError())
        }         
        if (deleteSuccess) {
            toast.success('Booking Deleted Successfully', { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetDeleteBooking());
        } 

    }, [dispatch, error, deleteError, deleteSuccess])
    const deleteBookingHandler = (id) => {
        dispatch(deleteBooking(id))
    }
    const dataSource = [];
    bookings.forEach(booking => {
        dataSource.push({
            id: booking._id,
            checkIn: moment(booking.checkInDate).format('LLL'),
            checkOut: moment(booking.checkOutDate).format('LLL'),
            amount: `GHS ${booking.amountPaid}`,
            actions:
                <>
                    <div className='ml-4'>
                        <Link href={`/admin/bookings/${booking._id}`}>
                            <EyeOutlined style={{ fontSize: '1rem' }} />
                        </Link>


                        <DownloadOutlined onClick={() => downloadInvoice(booking)} style={{ fontSize: '1rem' }} className='pointer ml-4' />
                        <BsTrash onClick={() => deleteBookingHandler(booking._id)} style={{ fontSize: '1rem', color: 'red' }} className='pointer ml-4' />


                    </div>
                </>



        })
    });

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


    const columns = [
        {
            name: 'id',
            label: 'Booking ID',
            options: {
                setCellProps: () => ({ style: { margin: '1rem',  } }),
                filter: true,
                sort: true,

            }



        },
        {
            name: 'checkIn',
            label: 'Check In',
            options: {
                setCellProps: () => ({ style: { margin: '1rem', color: 'green' } }),
                filter: true,
                sort: true
            }

        },
        {
            name: 'checkOut',
            label: 'Check Out',
            options: {
                setCellProps: () => ({ style: { margin: '1rem', color: 'red' } }),
                filter: true,
                sort: true
            }

        },
        {
            name: 'amount',
            label: 'Amount Paid',
            options: {
                setCellProps: () => ({ style: { margin: '1rem', color: 'green' } }),
                customBodyRender: (data, type, row) => { return <b className='ml-4'>{data}</b> },
                filter: true,
                sort: true

            },



        },
        {
            name: 'actions',
            label: 'View / Download/Delete',
            customBodyRender: (data, type, row) => { return <div className='mt-4'>{data}</div> },
            options: {
                setCellProps: () => ({ style: { margin: '1rem' } }),
                download: false


            }
        }

    ]

    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, [])

 


    const downloadInvoice = async (booking) => {

        const data = {

            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://res.cloudinary.com/hopekumordzie/image/upload/v1640993422/head_naqzd1.png",
                // The invoice background
                "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "Luxury Apt",
                "address": "East Legon Street 123",
                "zip": "00233 AB",
                "city": "Accra",
                "country": "Ghana"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                "company": `${booking?.user?.name}`,
                "address": `${booking?.user?.email}`,
                "zip": "4567 CD",
                "city": `Check In ${new Date(booking?.checkInDate).toLocaleDateString('en-UK')}`,
                "country": `Check Out ${new Date(booking?.checkOutDate).toLocaleDateString('en-UK')}`,
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": `${booking?._id}`,
                // Invoice data
                "date": `${new Date(Date.now()).toLocaleDateString('en-UK')}`,
                // Invoice due date
                "due-date": "31-12-2021"
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": `${booking?.daysOfStay}`,
                    "description": `${booking?.room?.name}`,
                    "tax-rate": 0,
                    "price": `${booking?.room?.pricePerNight}`
                },

            ],
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "This is an auto generated Invoice of your booking in Luxury Apt - Hope Kumordzie",
            // Settings to customize your invoice
            "settings": {

                "currency": "GHS", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                // "tax-notation": "gst", // Defaults to 'vat'
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                // "format": "A4" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
            },
            "translate": {
                "invoice": "Luxury Apt Booking INVOICE",  // Default to 'INVOICE'


            },
        };
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`Invoice_${booking?._id}.pdf`, result.pdf)
    }




    return (
        <div>
            {
                loading === true ? <Loader /> :
                    <>
                        <div className='container container-fluid'>
                            <h1 className='my-5 fw-light rale fw-bold admin-header'>{bookings && bookings.length} Bookings</h1>
                            {
                                ready && <MUIDataTable title={'All Bookings'} columns={columns} data={dataSource} options={options} className='px-3 addRadius' />
                            }
                        </div>
                    </>
            }
        </div>


    )

}
export default AllBookings;
