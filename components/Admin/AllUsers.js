import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { clearMyBookingsError, getMyBookings } from '../../redux/Slice/myBookingsSlice'
import MUIDataTable from 'mui-datatables'
import Link from 'next/link'
import easyinvoice from 'easyinvoice'
import moment from 'moment'
import { useRouter } from 'next/router'
import { getallAdminUsers, clearAdminUsersError } from '../../redux/Slice/allAdminUsersSlice';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash, BsPlusCircleDotted } from 'react-icons/bs'
import Loader from '../layout/Loader'
import { deleteUser, clearDeleteUserError, resetDeleteUser } from '../../redux/Slice/deleteUserSlice';


const AllUsers = () => {
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, users } = useSelector(state => state.allAdminUsers)
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = useSelector(state => state.deleteUser)
    useEffect(() => {
        dispatch(getallAdminUsers())
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(clearAdminUsersError())
        }
        if (deleteSuccess) {
            toast.success('User Deleted Successfully', { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(resetDeleteUser());
        }
        if (deleteError) {
            toast.error(deleteError, { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(clearDeleteUserError())
        }
    }, [dispatch, error, deleteError, deleteSuccess])


    const options = {
        filterType: 'multiselect',
        download: true,
        responsive: 'simple',
        elevation: 0,
        sortOrder: {
            name: 'userId',
            direction: 'desc'
        }

    }
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const dataSource = [];
    users && users.forEach(user => {
        dataSource.push({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            actions:
                <>
                    <div className='ml-4'>
                        <Link href={`/admin/users/${user._id}`}>
                            <AiOutlineEdit style={{ fontSize: '1rem', cursor: 'pointer' }} />
                        </Link>


                        <BsTrash onClick={() => deleteUserHandler(user._id)}  style={{ fontSize: '1rem', color: 'red' }} className='pointer ml-4' />


                    </div>
                </>



        })
    });


    const columns = [
        {
            name: 'userId',
            label: 'User ID',
            options: {
                filter: true,
                sort: true,

            }



        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true
            }

        },
        {
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }

        },
        {
            name: 'role',
            label: 'Role',
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
                        <h1 className='my-5 fw-bold rale admin-header'>{`${users && users.length} Users`}</h1>
                        {
                            ready && <MUIDataTable title={'Admin Control'} columns={columns} data={dataSource} options={options} className='px-3 addRadius rale' />
                        }
                    </>
            }

        </div>
    )
}

export default AllUsers
