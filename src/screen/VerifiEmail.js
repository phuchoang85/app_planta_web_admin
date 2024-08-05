
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';



const VerifiEmail = () => {

    const location = useLocation();
    const [isLoading, setisLoading] = useState(true);
    const [isSucces, setisSucces] = useState(false)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        const getResult = async (token, email) => {
            try {
                const result = await fetch(`http://quockhanh020924.id.vn:6868/api/xac-thuc-email?email=${email}&token=${token}`);
                setisLoading(false);
                const response = await result.json()
                if (response.status) {
                    setisSucces(true)
                    console.log(response.data)
                } else {
                    console.log(response.data)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getResult(token, email);
    }, [])


    if (isLoading) {
        return (
            <div>
                <p>đang tải</p>
            </div>
        )
    }


    return (
        <div>
            {isSucces ? <p>Xác thực thành công</p> : <p>Xác thực không thành công</p>}
        </div>
    )
}

export default VerifiEmail
