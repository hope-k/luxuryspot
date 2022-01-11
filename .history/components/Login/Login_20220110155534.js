import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import ButtonLoader from '../ButtonLoader';
import Link from 'next/link'
import { IoIosLogIn } from 'react-icons/io'


const Login = () => {
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
        console.log('RESULT', result)
        if (result.error) {
            toast.error(result.error, { theme: 'colored', style: { borderRadius: '2rem' }, });
        }else{
            window.location.href = '/'
        }
    }
  
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg addRadius fw-normal formBackground" onSubmit={onSubmit}>
                        <h1 className="mb-3 fw-light rale">Login  <IoIosLogIn /> </h1> 
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control addRadius"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
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
