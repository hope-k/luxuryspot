import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoIosPeople } from 'react-icons/io'
import { IoBedOutline } from 'react-icons/io5'
import { Select } from 'antd'
import { FcSearch } from 'react-icons/fc'
import { AiOutlineFileSearch} from 'react-icons/ai'


const Search = () => {
    const { Option } = Select;

    const [location, setLocation] = useState('')
    const [guests, setGuests] = useState('')
    const [category, setCategory] = useState('')
    const router = useRouter();
    const onSubmit = (e) => {
        e.preventDefault()
        router.push(`/?location=${location.trim()}&category=${category}&guests=${guests}`)

    }
    return (
        <div className="container container-fluid text-white">
            <div className="row wrapper ">
                <div className="col-10 col-lg-5 ">
                    <form className="shadow-lg addRadius fw-normal formBackground" onSubmit={onSubmit}>
                        <h2 className="mb-3 fw-light rale text-white">Search Rooms <FcSearch/> </h2>
                        <div className="form-group rale fw-bold">
                            <label htmlFor="location_field">By Location    <HiOutlineLocationMarker className='ml-1 mb-1' /> </label>
                            <input
                                type="text"
                                className="form-control addRadius searchPlaceholder"
                                id="location_field"
                                placeholder="Accra, East Legon, Cantonments, Spintex"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{
                                    
                                }}
                            />
                        </div>

                        <div className="form-group rale fw-bold">
                            <label htmlFor="guest_field">No. of Guests <IoIosPeople className='ml-1 mb-1' /></label>
                            <Select className="w-100 " id="guest_field" value={guests} onChange={(value) => setGuests(value)}>
                                {
                                    [1, 2, 3, 4, 5, 6].map(num => (
                                        <Option key={num} value={num}>{num}</Option>



                                    ))
                                }
                            </Select>
                        </div>

                        <div className="form-group rale fw-bold">
                            <label htmlFor="room_type_field">Room Type <IoBedOutline className='ml-1 mb-1' />  </label>
                            <Select className="w-100 addRadius" id="room_type_field" value={category} onChange={(value) => setCategory(value)}>
                                <Option value='King'>King</Option>
                                <Option value='Single'>Single</Option>
                                <Option value='Twins'>Twins</Option>
                            </Select>
                        </div>

                        <button type="submit" className="btn btn-block py-2 fw-bold rale"> Search <AiOutlineFileSearch /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search
