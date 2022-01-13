import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import Loader from '../../components/layout/Loader'
import { useRouter } from 'next/router'
import { notification, Select } from 'antd'
import { GrUpdate } from 'react-icons/gr'
import { Input } from 'antd';
import ButtonLoader from '../ButtonLoader/index'
import { updateRoom, clearUpdateRoomError, resetUpdateRoom } from '../../redux/Slice/updateRoomSlice'
import {clearRoomError} from '../../redux/Slice/roomSlice'
import { getRoom } from '../../redux/Slice/roomSlice';
import { motion } from 'framer-motion'


const UpdateRoom = () => {
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
    const [oldImages, setOldImages] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
    const { error, loading, success } = useSelector(state => state.updateRoom)
    const { error: roomError, loading: roomLoading, room } = useSelector(state => state.room)


    const { id } = router.query;

    useEffect(() => {
        dispatch(getRoom({ id: id, req: '' }));
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearUpdateRoomError());
        }
        if (roomError) {
            toast.error(roomError, { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(clearRoomError());
        }

        if (success) {
            toast.success('Room Updated Successfully', { theme: 'colored', style: { borderRadius: '2rem' }, });
            dispatch(resetUpdateRoom());
            router.push('/admin/rooms')

        }
    }, [error, success, dispatch, roomError, id]);
    useEffect(() => {
        if (room) {
            setName(room.name);
            setPricePerNight(room.pricePerNight)
            setDescription(room.description)
            setAddress(room.address)
            setCategory(room.category)
            setGuestCapacity(room.guestCapacity)
            setNumOfBeds(room.numOfBeds)
            setInternet(room.internet)
            setBreakfast(room.breakfast)
            setAirConditioned(room.airConditioned)
            setPetsAllowed(room.petsAllowed)
            setRoomCleaning(room.roomCleaning)
            setOldImages(room.images)

        }
    }, [room])

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
            numOfBeds

        }
        if (images.length !== 0) {
            roomData.images = images
        }
        dispatch(updateRoom({ updateData: roomData, id: id }));
    }
    const onFileChange = (e) => {
        //reset the upload images on change so that the images dont keep appending 
        setOldImages([]);
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
                    setImages((oldArray) => [...oldArray, reader.result])
                    setImagesPreview((oldArray) => [...oldArray, reader.result])
                }
            }
        })

    }










    return (
        <>

            {
                roomLoading ? <Loader /> : (

                    <div className="container container-fluid ">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-8">
                                <form onSubmit={onSubmit} className="shadow-lg addRadius formBackground text-white" enctype="multipart/form-data">
                                    <h1 className="mb-4 rale text-white">Update Room</h1>
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
                                            className="fw-bold addRadius textArea"
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
                                            {['King', 'Single', 'Twins'].map(item => (
                                                <Option key={item} value={item}>{item}</Option>
                                            ))}
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
                                            checked={internet}
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
                                            checked={breakfast}
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
                                            checked={airConditioned === true && true}
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
                                            checked={petsAllowed}
                                            id="petsAllowed_checkbox"
                                            value={petsAllowed}
                                            onChange={(e) => { setPetsAllowed(e.target.checked); console.log('pets', petsAllowed) }}
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
                                            checked={roomCleaning}
                                            onChange={(e) => setRoomCleaning(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                                            Room Cleaning
                                        </label>
                                    </div>
                                    <div className="form-group mt-4">
                                        <div >
                                            <input
                                                type="file"
                                                name="roomImages"
                                                className="custom-filee-input w-100"
                                                id="customFile"
                                                multiple={true}
                                                onChange={onFileChange}

                                            />

                                        </div>
                                        {
                                            imagesPreview.map(img => (
                                                <motion.img
                                                    animate={{ opacity: [0, 1], x: [-55, 0] }}
                                                    exit={{ opacity: 0, y: 55}}
                                                    transition={{ ease: [.6, .01, -.05, .95], duration: 1.8 }}
                                                    src={img}
                                                    key={img}
                                                    alt="Images Preview"
                                                    className="mt-3 mr-2 p-1 imageThumb addRadius"
                                                    width="150"
                                                    height="100"
                                                />


                                            ))
                                        }
                                        {
                                            oldImages && oldImages.map(img => (
                                                <motion.img
                                                    animate={{ opacity: [0, 1], x: [-55, 0],  }}
                                                    exit={{ opacity: 0, y: 55 }}
                                                    transition= {{ease: [.6, .01, -.05, .95], duration: 8 }}
                                                    src={img.url}
                                                    key={img.public_id}
                                                    alt="Images Preview"
                                                    className="mt-3 mr-2 p-1 imageThumb addRadius"
                                                    width="150"
                                                    height="100"
                                                />


                                            ))
                                        }
                                    </div>
                                    <button
                                        type="submit" className="btn w-100 d-block new-room-btn py-3"
                                        disabled={loading && true}
                                        >
                                        {
                                            loading ? <ButtonLoader /> : <span className='rale'>Update Room <GrUpdate className='ml-2' style={{ color: 'white' }} /></span>
                                        }

                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}



export default UpdateRoom;
