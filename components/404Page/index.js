import React from 'react'
import Link from 'next/link'
import { Result, Button } from 'antd';

const NotFound = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link href='/'><Button >Back Home</Button></Link>}

            />
        </div>
    )
}

export default NotFound
