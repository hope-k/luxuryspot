import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import moment from 'moment'
//restore

const container = {
    hidden: {
        opacity: 0,
        x: 20
    },
    show: {
        opacity: 1,
        x: 0
    }
}
const ListReviews = ({ reviews }) => {
    const listReviews = Array.from(reviews);
    const sortReviews = listReviews.reverse();

    const controls = useAnimation();
    const { ref, inView } = useInView()
    useEffect(() => {
        if (inView) {
            controls.start('show')
        }

        
    })


    return (
        <div className="reviews w-75 rale fw-bold">
            <h3>Reviews:</h3>
            <hr />
            {
                sortReviews && sortReviews.map((review) =>
                (
                    <motion.div
                        ref={ref}
                        variants={container}
                        animate={controls}
                        key={review._id} className="review-card my-3"
                        transition={{ ease: [.6, .01, -.05, .95], duration: 1, staggerChildren: .6 }}
                    >
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}>

                            </div>
                        </div>
                        {review?.createdAt &&
                            <p className="review_user">Posted on  { moment(new Date(review.createdAt)).format('LLL')}</p>

                        }
                        <p className="review_user">by {review.name}</p>
                        <p className="review_comment">{review.comment}</p>

                        <hr />
                    </motion.div>


                ))
            }
        </div>
    )
}

export default ListReviews
