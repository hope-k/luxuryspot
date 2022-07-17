import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import { notification } from 'antd'
import { createNewReview, resetNewReviews, clearNewReviewsError } from '../../redux/Slice/newReviewsSlice';
import { Modal } from 'antd';
import { Rate } from 'antd';
import { Input } from 'antd';
import { MdOutlineRateReview} from 'react-icons/md'
import { GoComment} from 'react-icons/go'
import { AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'



const NewReview = () => {
    const { TextArea } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter()
    const [ratings, setRatings] = useState(0)
    const [comment, setComment] = useState('')
    const { error, success } = useSelector(state => state.newReview);
    const { id } = router.query;
    const showModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (error) {
            toast.error(error, { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(clearNewReviewsError())
        }
        if (success) {
            toast.success('Review Successfully Posted', { theme: 'colored', style: { borderRadius: '1rem' }, });
            dispatch(resetNewReviews());
            router.reload(window.location.pathname)
        }
    }, [error, success, dispatch]);


    const onSubmit = () => {
        const reviewData = {
            ratings: ratings,
            comment: comment,
            roomId: id,
        }
        dispatch(createNewReview(reviewData))
        closeModal()
    }
    const ratingDescription = ['Terrible', 'Bad', 'Normal', 'Good', 'Amazing'];




    return (
        <>
            <div className="container">
                <div className="addRadius">
                    <button id="review_btn" className="btn mt-4 mb-5 w-25 rale" onClick={() => showModal()}>Make a review <MdOutlineRateReview /></button>
                    <Modal
                        onOk={() => onSubmit()}
                        okButtonProps={
                            {
                                shape: 'round',
                                className: 'bg-danger'
                            }
                        }
                        cancelButtonProps={
                            {
                                shape: 'round'
                            }
                        }

                        okText='Submit Review'
                        width={800}
                        centered title='Submit a review' visible={isModalVisible} onCancel={() => closeModal()}
                    >
                        <span className='d-block'> <AiOutlineDislike /> </span>
                        <Rate
                            style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: 'red' }}
                            tooltips={ratingDescription}
                            allowClear
                            allowHalf
                            defaultValue={0.0}
                            onChange={(value) => setRatings(value)}
                        />
                        <span className='ml-4'><AiOutlineLike /> </span>

                        <h4 className='rale fw-bold'>Comment <GoComment/></h4>
                        <TextArea
                            showCount 
                            maxLength={100}
                            allowClear
                            bordered
                            className='rounded-3'
                            onChange={(e) => setComment(e.target.value)}

                        />

                    </Modal>
                </div>
            </div>

        </>
    )
}

export default NewReview
