import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import ButtonLoader from '../ButtonLoader';
import Link from 'next/link'
import { IoIosLogIn } from 'react-icons/io'
import { notification} from 'antd'

const Login = () => {
    useEffect(() => {
        notification.info({
            duration: 0,
            className: 'addRadiusCarousel',
            message: "Login in as admin",
            description: "Login in as admin to create, read, update and delete room, users, bookings etc. Use these logins to login as an admin. || Email: admin@gmail.com || Password: kumordzie"
        })
    },[])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const result = await signIn('credentials', {
            email: email.toLowerCase(),
            password,
            redirect: false
        })
        setLoading(false)
        if (result.error) {
            toast.error(result.error, { theme: 'colored', style: { borderRadius: '2rem' }, });
        }else{
            window.location.href = '/'
        }
    }
  
    return (
        <></>
        
                <Image
                    layout='fill'
                    src='https://res.cloudinary.com/hopekumordzie/image/upload/v1642266318/bg_ffc9wn.jpg'
                    className="gradientBackground"
                />
        <div className="container container-fluid text-white">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg addRadius fw-normal formBackground" onSubmit={onSubmit}>
                        <h1 className="mb-3 fw-light rale text-white">Login  <IoIosLogIn /> </h1> 
                        <div className="form-group rale fw-bold">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control addRadius"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="form-group rale fw-bold">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control addRadius"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Link href='/password/forgot'>
                            <a className="float-right mb-4 fw-bold text-secondary rale">Forgot Password?</a>
                        </Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 rale"
                            disabled={loading ? true : false}
                        >
                            {
                                loading ? <ButtonLoader /> : 'Login'
                            }
                        </button>

                    </form>
                    <Link href="/register" ><a className="float-left mt-2 ml-1 fw-bold text-secondary rale">Don't have an account? Register</a></Link>
                </div>
            </div>
        </div>
    )
}

export default Login
