import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearUpdateUserDetailsError, resetUpdateUserDetails, updateUserDetails } from '../../redux/Slice/updateUserDetailsSlice'
import { getUserDetails, clearUserDetailsError } from '../../redux/Slice/getUserDetailsSlice'
import { notification } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai'
import Loader from '../layout/Loader'
import { useRouter } from 'next/router'
import { Select } from 'antd'
import { GrUpdate } from 'react-icons/gr'
import {toast} from 'react-toastify'


const UpdateUserDetails = () => {
    const { Option } = Select;
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.updateUserDetails);
    const { loading: userLoading, user } = useSelector(state => state.userDetails);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('')

    useEffect(() => {
        dispatch(getUserDetails(id));
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearUpdateUserDetailsError());
        }

        if (success) {
            notification.success({message: 'Role Updated Successfully', placement: 'bottomRight'})
            dispatch(resetUpdateUserDetails());
            router.push('/admin/users')
        }

    }, [dispatch, error, success, id])

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        
    }, [user])


    const submitHandler = (e) => {
        e.preventDefault();
        const updateData = {
            role
        
        }
        dispatch(updateUserDetails({id: id, role: updateData }))
    }





    return (
        <>

            {
                userLoading ? <Loader /> :
                    <>
                        <div className="container container-fluid">
                            <div className="row wrapper">
                                <div className="col-10 col-lg-5">
                                    <form className="shadow-lg addRadius formBackground" onSubmit={submitHandler}>
                                        <h1 className="mt-2 mb-5 rale">Change User Role</h1>

                                        <div className="form-group rale fw-bold">
                                            <label htmlFor="name_field">Name</label>
                                            <input
                                                type="name"
                                                id="name_field"
                                                className="form-control addRadius text-"
                                                name="name"
                                                value={name}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group rale fw-bold">
                                            <label for="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control addRadius text-black"
                                                name="email"
                                                value={email}
                                                readOnly={true}
                                            />
                                        </div>

                                        <div className="form-group rale fw-bold">
                                            <label htmlFor="role_field">Role</label>
                                            <Select onChange={(value) => { setRole(value) }} className="w-100" value={role} >
                                                <Option value='user'>User</Option>
                                                <Option value='admin'>Admin</Option>
                                            </Select>
                                        </div>

                                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3 rale"
                                            disabled={loading ? true : false}
                                        >
                                            Update Role <GrUpdate className='ml-2'/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default UpdateUserDetails;
