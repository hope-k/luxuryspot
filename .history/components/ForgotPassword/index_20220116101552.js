import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import { clearForgotPasswordError, forgotPassword, resetForgotPassword } from '../../redux/Slice/forgotPasswordSlice';
import ButtonLoader from '../ButtonLoader';



const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (success) {
            notification.info({
                message: "Check spam messages if you do not see the email in your inbox",
                className: "addRadiusCarousel",
                duration: 0
            })
            toast.success(success, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetForgotPassword());
        }
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, })
            dispatch(clearForgotPasswordError())
        }
    }, [error, dispatch, success])
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email }
        dispatch(forgotPassword(userData));
    }
    return (
        <>


            <div className="row wrapper text-white">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg fw-normal addRadius formBackground" onSubmit={onSubmit} >
                        <h1 className="mb-3 fw-light rale text-white">Reset Your Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Your Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control addRadius rale"
                                value={email}
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3 rale"
                            disabled={loading && true}
                        >
                            {loading ? <ButtonLoader /> : 'Send Email'}

                        </button>

                    </form>
                </div>
            </div>
        </>

    )
}

export default ForgotPassword
