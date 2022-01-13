import React, { useEffect, useState } from 'react';
import { clearUpdateUserError, updateUser, resetUpdateUser } from '../../redux/Slice/updateUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import ButtonLoader from '../ButtonLoader';
import {motion} from 'framer-motion'


const UpdateProfile = () => {
    const { success, error, loading: updateLoading } = useSelector(state => state.updateUser);
    const { user, loading } = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const router = useRouter()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')


    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = values;
        const userData = {
            name: name, email, password, avatar
        }
        dispatch(updateUser(userData))
    }
    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            //handle file upload using FileReader
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value })
        }
    }

    useEffect(() => {
        if (user) {
            setValues({ ...values, name: user.name, email: user.email })
            if(user.avatar){
                setAvatarPreview(user.avatar.url)
            }

        }
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearUpdateUserError())
        }
        if (success) {
            toast.success(success, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetUpdateUser())


            router.push('/')

        }

    }, [success, error, user])

    return (
        <>


            {
                loading ? <Loader /> :
                    <div className="container container-fluid ">
                        <div className="row wrapper ">
                            <div className="col-10 col-lg-5 ">
                                <form className='shadow-lg addRadius fw-normal formBackground text-white' onSubmit={onSubmit}>
                                    <h1 className="mb-3 fw-normal rale text-white">Update Your Profile</h1>

                                    <div className="form-group rale fw-bold">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control addRadius"
                                            onChange={handleChange}
                                            value={values.name}
                                            name='name'
                                        />
                                    </div>

                                    <div className="form-group rale fw-bold">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control addRadius"
                                            value={values.email}
                                            onChange={handleChange}
                                            name='email'

                                        />
                                    </div>

                                    <div className="form-group rale fw-bold">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control addRadius"
                                            value={values.password}
                                            onChange={handleChange}
                                            name='password'

                                        />
                                    </div>

                                    <div className='form-group rale fw-bold'>
                                        <label htmlFor='avatar_upload'>Avatar</label>
                                        <div className='d-flex align-items-center'>
                                            <motion.div animate={{ opacity: [0, 1], transition: { type: 'linear', duration: 1.8 } }}>
                                                <figure className='avatar mr-3 item-rtl'>
                                                    <motion.img
                                                        layout
                                                        src={avatarPreview}
                                                        className='rounded-circle'
                                                        alt='Default Preview'
                                                    />
                                                </figure>
                                            </motion.div>
                                            <div >
                                                <input
                                                    type='file'
                                                    name='avatar'
                                                    className='custom-fileee-input w-100' 
                                                    id='customFile'
                                                    accept="images/*"
                                                    accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zipimages/*"                                                    
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <button
                                        id="update-btn"
                                        type="submit"
                                        className="btn btn-block py-3 update-btn rale"
                                        disabled={loading && true}
                                    >
                                        {
                                            updateLoading ? <ButtonLoader /> : 'Update Profile' 
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default UpdateProfile
