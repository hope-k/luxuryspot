import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import Loader from '../../components/layout/Loader'
import { useRouter } from 'next/router'
import { Select } from 'antd'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { Input } from 'antd';
import ButtonLoader from '../ButtonLoader/index'
import { createAdminRoom, clearNewAdminRoomError, resetNewAdminRoom } from '../../redux/Slice/newAdminRoomSlice';
import { motion } from 'framer-motion'


const NewRoom = () => {
    const { TextArea } = Input;
    const { Option } = Select;
    const [name, setName] = useState('');
    const [pricePerNight, setPricePerNight] = useState(0);
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [guestCapacity, setGuestCapacity] = useState(0);
    const [numOfBeds, setNumOfBeds] = useState(0);
    const [internet, setInternet] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [airConditioned, setAirConditioned] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [roomCleaning, setRoomCleaning] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const { error, loading, success } = useSelector(state => state.newAdminRoom)




    useEffect(() => {
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearNewAdminRoomError());
        }
        if (success) {
            dispatch(resetNewAdminRoom());
            toast.success('Room Created Successfully', { theme: 'colored', style: { borderRadius: '2rem' }, });
            router.push('/admin/rooms');

        }
    }, [error, success, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        const roomData = {
            name,
            pricePerNight,
            description,
            address,
            category,
            guestCapacity,
            internet,
            breakfast,
            airConditioned,
            petsAllowed,
            roomCleaning,
            images,
            numOfBeds

        }
        dispatch(createAdminRoom(roomData));
    }
    const onFileChange = (e) => {
        setImagesPreview([]);
        setImages([]);

        const files = Array.from(e.target.files);
        //map through each file and read it 
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (reader.readyState === 2) {
                    //since setImages is an array we need to spread old values of the array before reader result during the mapping
                    setImages((oldArray) => [...oldArray, reader.result]);
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);
                }
            }
        })

    }










    return (


        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form onSubmit={onSubmit} className="shadow-lg addRadius formBackground text-white" enctype="multipart/form-data">
                        <h1 className="mb-4 rale text-white">Create New Room</h1>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="name_field" className="fw-normal">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control addRadius"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group rale fw-bold ">
                            <label htmlFor="price_field" className="fw-normal">Price Per Night</label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control addRadius"
                                value={pricePerNight}
                                onChange={(e) => setPricePerNight(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="description_field" className="fw-normal">Description</label>
                            <TextArea
                                className="fw-normal  addRadius"
                                id="description_field"
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                showCount
                                maxLength={750}
                                required
                                allowClear
                            ></TextArea>
                        </div>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="address_field" className="fw-normal">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control addRadius"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="category_field" className="fw-normal">Category</label>
                            <Select onChange={(value) => setCategory(value)} className="w-100" id="category_field" value={category}>
                                <Option value="King">King</Option>
                                <Option value="Single">Single</Option>
                                <Option value="Twins">Twins</Option>
                            </Select>
                        </div>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="category_field" className="fw-normal">Guest Capacity</label>
                            <Select onChange={(value) => setGuestCapacity(value)} className="w-100" id="guestCapacity_field" value={guestCapacity}>
                                {
                                    [1, 2, 3, 4, 5, 6].map(num => (
                                        <Option key={num} value={num}>{num}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="category_field" className="fw-normal">Number of Beds</label>
                            <Select onChange={(value) => setNumOfBeds(value)} className="w-100" id="numOfBeds_field" value={numOfBeds}>
                                {
                                    [1, 2, 3, 4, 5, 6].map(num => (
                                        <Option key={num} value={num}>{num}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <label className="mb-3" className="fw-normal">Room Features</label>
                        <div className="form-check rale fw-bold">
                            <input
                                className="form-check-input addRadius"
                                type="checkbox"
                                id="internet_checkbox"
                                value={internet}
                                onChange={(e) => setInternet(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="internet_checkbox">
                                Internet
                            </label>
                        </div>
                        <div className="form-check rale fw-bold">
                            <input
                                className="form-check-input addRadius"
                                type="checkbox"
                                id="breakfast_checkbox"
                                value={breakfast}
                                onChange={(e) => setBreakfast(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="breakfast_checkbox">
                                Breakfast
                            </label>
                        </div>
                        <div className="form-check rale fw-bold">
                            <input
                                className="form-check-input addRadius"
                                type="checkbox"
                                id="airConditioned_checkbox"
                                value={airConditioned}
                                onChange={(e) => setAirConditioned(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                Air Conditioned
                            </label>
                        </div>
                        <div className="form-check rale fw-bold">
                            <input
                                className="form-check-input addRadius"
                                type="checkbox"
                                id="petsAllowed_checkbox"
                                value={petsAllowed}
                                onChange={(e) => setPetsAllowed(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                Pets Allowed
                            </label>
                        </div>
                        <div className="form-check rale fw-bold">
                            <input
                                className="form-check-input addRadius"
                                type="checkbox"
                                id="roomCleaning_checkbox"
                                value={roomCleaning}
                                onChange={(e) => setRoomCleaning(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                                Room Cleaning
                            </label>
                        </div>
                        <div className="form-group mt-4">
                            <div>

                                <input
                                    type="file"
                                    name="roomImages"
                                    accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip/images/*"                                                    
                                    className='custom-filee-input w-100'
                                    multiple
                                    onChange={onFileChange}

                                />

                            </div>
                            {
                                imagesPreview.map(img => (
                                    
                                    <motion.img
                                        animate={{opacity: [0, 1], x:[-55, 0], transition: {ease: [.6,.01,-.05, .95 ], duration: .8}}}
                                        exit={{ opacity: 0, y: 55, transition: { type: 'linear', duration: .8 } }}
                                        src={img}
                                        key={img}
                                        alt="Images Preview"
                                        className="mt-3 mr-2 p-1 imageThumb addRadius"
                                        width="150"
                                        height="100"
                                    />



                                ))
                            }
                        </div>
                        <button
                            disabled={loading || !name || !description || !pricePerNight || !category || !numOfBeds || !guestCapacity || images.length === 0 ? true : false}
                            type="submit" className="btn m-auto d-block new-room-btn py-3 w-100 ">
                            {
                                loading ? <ButtonLoader /> : <span className='fw-normal rale'>Create Room <BsPlusCircleDotted className='mb-1' /></span>
                            }

                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewRoom
