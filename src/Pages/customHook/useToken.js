import React, { useEffect, useState } from 'react';

const useToken = (email) => {

    const [token, setToken] = useState('')

    useEffect(() => {
        if (email) {
            fetch(`https://puranclothes.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('clotheToken', data.accessToken)
                        setToken(data.accessToken)
                    }
                })
        }
    }, [email])

    return [token]

};

export default useToken;