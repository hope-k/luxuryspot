import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegisterUserError, resetRegister } from '../../redux/Slice/registerUserSlice';
import Link from 'next/link'
import { BiUserPlus } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { FiLock } from 'react-icons/fi'


const Register = () => {
    const MotionVisible = motion(AiOutlineEye);
    const MotionInvisible = motion(AiOutlineEyeInvisible)
    const [visible, setVisibility] = useState(false);
    const toggleVisibility = () => {
        setVisibility(!visible)
    }
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('')
    const { name, email, password } = user;
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const { success, error, loading } = useSelector(state => state.registerUser);
    useEffect(() => {
        if (success) {
            toast.success(success, { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(resetRegister())
            setUser({
                name: '',
                email: '',
                password: ''
            });
            setAvatar('');
            setAvatarPreview('/images/default_avatar.jpg')

        }
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '1rem' }, });
            //always dispatch redux actions
            dispatch(clearRegisterUserError())
        }

    }, [dispatch, success, error])
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name, email: email.toLowerCase(), password, avatar
        }
        dispatch(registerUser(userData))

    }
    const onChange = (e) => {
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
            setUser({ ...user, [name]: value })

        }
    }



    return (
        <>



            <div className="container container-fluid text-white" >
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg fw-normal addRadius formBackground" onSubmit={onSubmit}>
                            <h2 className="mb-3 fw-light rale text-white">Create a new account <BiUserPlus className='mb-2' /></h2>

                            <div className="form-group rale fw-bold">
                                <label htmlFor="name_field">Full Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control addRadius formBackground"
                                    value={name}
                                    onChange={onChange}
                                    name='name'
                                />
                            </div>

                            <div className="form-group rale fw-bold">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control addRadius"
                                    value={email}
                                    onChange={onChange}
                                    name='email'
                                />
                            </div>

                            <div className="form-group rale fw-bold passwordInput">
                                <label htmlFor="password_field">Password <FiLock style={{ marginBottom: '3px' }} /></label>
                                <input
                                    type={visible ? 'text' : 'password'}
                                    id="password_field"
                                    className="form-control  addRadius"
                                    value={password}
                                    onChange={onChange}
                                    name='password'
                                />
                                {
                                    visible ?
                                        <div onClick={() => toggleVisibility()} >
                                            <MotionInvisible className='passwordIcon' />
                                        </div>
                                        :
                                        <div onClick={() => toggleVisibility()}>
                                            <MotionVisible className='passwordIcon' />
                                        </div>

                                }
                            </div>

                            <div className='form-group rale fw-bold'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <motion.img
                                                animate={{ opacity: [0, 1] }}
                                                transition={{ ease: [-.6, .01, -.05, .95], duration: 2 }}
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='image'
                                            />
                                        </figure>
                                    </div>
                                    <div>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-fileee-input w-100'
                                            id='customFile'
                                            accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip/images/*"
                                            onChange={onChange}
                                        />

                                    </div>
                                </div>
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3 rale"
                                disabled={loading || !email || !password || !name ? true : false}
                            >
                                {
                                    loading ? <ButtonLoader /> : 'Register'
                                }
                            </button>
                        </form>
                        <Link href="/login"><a className="float-left mt-2 fw-bold text-secondary rale">Already have an account? Sign in</a></Link>

                    </div>
                </div>
            </div>
        </>


    )
}

export default Register
