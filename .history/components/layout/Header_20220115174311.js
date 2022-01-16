import React, { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { getUser } from '../../redux/Slice/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'next-auth/react'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react'
import { Badge } from 'antd';
import { motion } from 'framer-motion'
import { IoIosLogIn } from 'react-icons/io'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';




const Header = () => {
    const MotionDropdown = motion(Dropdown)

    const { data: session, status } = useSession();
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.currentUser)
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])
    const menu = (
        <Menu className="addRadius p-2 dropdownBackground mr-4">
            {
                !!session?.user && session?.user?.role === 'admin' && (
                    <>
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1, type: 'linear' }}

                        >
                            <Badge dot color='cyan' className='m-2 antBadge' style={{ position: 'absolute', right: '3rem', top: '.1rem' }} />
                        </motion.div>
                        <Menu.ItemGroup title='Admin Session'>
                            <Menu.Item key='4' className='addRadius p-2 m-2 rale fw-bold w-100'>
                                <Link href='/admin/rooms' passHref>
                                    <a>- Rooms</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='5' className='addRadius p-2 m-2 rale fw-bold w-100'>
                                <Link href='/admin/bookings' passHref>
                                    <a>- Bookings</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key='' className='addRadius p-2 m-2 rale fw-bold w-100'>
                                <Link href='/admin/users' passHref>
                                    <a>- Users</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item className='addRadius p-2 m-2 rale fw-bold w-100'>
                                <Link href='/admin/reviews' passHref>
                                    <a>- Reviews</a>
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>


                        <hr />
                    </>
                )
            }
            <Menu.Item key='1' className='rale fw-bold'>

                <Link href='/bookings/me' >
                    <a>My Bookings</a>
                </Link>

            </Menu.Item>
            <Menu.Item key='2' className='rale fw-bold'>
                <Link href='/me/update'>
                    <a>Profile</a>
                </Link>

            </Menu.Item>
            <Menu.Item key='3' className='rale fw-bold'>
                <Link href='#'>
                    <a onClick={() => signOut()} className='text-danger'>Logout <RiLogoutCircleRLine /></a>
                </Link>
            </Menu.Item>
        </Menu>
    )
    return (
        <nav className="navbar row justify-content-center customNav">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand" style={{ cursor: 'pointer', position: 'relative', marginLeft: '-.5rem' }}>
                        <Link href='/' passHref>
                            <motion.img
                                animate={{ opacity: [0, 1], }}
                                transition={{ ease: [.6, .01, -.06, .95], duration: .8 }}
                                src="/images/head.png"
                                alt="Luxury-Spot"
                                width={250}

                            />
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-center">


                    {
                        !!user || !!session?.user ? (
                            <>
                                <MotionDropdown
                                    animate={{ opacity: [0, 1], x: [-22, 0] }}
                                    overlay={menu} trigger={['click']} className='ant-dropdown-position'
                                >
                                    <div className='d-flex'>
                                        <a className='d-flex '>
                                            <Badge dot color='green' />
                                            {
                                                !session?.user?.avatar?.url ?
                                                    <Avatar
                                                        style={{ backgroundColor: '#87d068', marginRight: '.8rem' }}
                                                        icon={<UserOutlined />}
                                                        size={{ xs: 35, sm: 35, md: 45, lg: 45, xl: 45 }}


                                                    /> : (
                                                        <figure className="avatar-nav avatar">

                                                            <img src={!user ? session?.user?.avatar?.url : user?.avatar?.url}
                                                                className='rounded-circle'
                                                            />
                                                        </figure>
                                                    )

                                            }



                                            <span className='dropdown-text mt-1 rale fw-bold'>{!user ? session.user.name.split(" ")[0] : user?.name.split(" ")[0]}</span>
                                            <DownOutlined className='ml-1 mt-2' />

                                        </a>
                                    </div>
                                </MotionDropdown>
                            </>

                        ) : loading === false ? (
                            <Link href='/login'>
                                <a className="btn btn-danger login-header-btn float-right rale addRadius">Sign Up or Login<IoIosLogIn /></a>
                            </Link>
                        ) : null

                    }

                </div>
            </div>
        </nav>

    )
}
export default Header;
