import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import ButtonLoader from '../ButtonLoader';
import { resetPassword, clearResetPasswordError, clearResetSuccess } from '../../redux/Slice/resetPasswordSlice';
import 
const ResetPassword = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, error, success } = useSelector(state => state.resetPassword)
    const onSubmit = (e) => {
        e.preventDefault();
        const { token } = router.query
        const userData = {
            token,
            passwords: {
                password,
                confirmPassword

            }
        }
        dispatch(resetPassword(userData))



    }
    useEffect(() => {
        if (success) {
            toast.success(success, { theme: 'colored', style: { borderRadius: '2rem' }, });
            notification.info({
                message: "Check spam messages if you do not see the email in your inbox",
                className: "addRadiusCarousel"
            })
            dispatch(clearResetSuccess());
            router.push('/login')
        }
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearResetPasswordError());
        }


    }, [error, success, dispatch])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg addRadius fw-normal formBackground text-white" onSubmit={onSubmit}>
                    <h1 className="mb-3 fw-light rale text-white">Enter Your New Password</h1>

                    <div className="form-group rale fw-bold">
                        <label htmlFor="password_field">New Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control addRadius"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <div className="form-group rale fw-bold">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control addRadius"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading && true}

                    >
                        {loading ? <ButtonLoader /> : 'Reset Password'}


                    </button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword
