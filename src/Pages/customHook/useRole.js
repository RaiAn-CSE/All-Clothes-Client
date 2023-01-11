import React, { useEffect, useState } from 'react';

const useRole = (email) => {

    const [role, setRole] = useState(false)
    const [isRoleLoading, setIsRoleLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`https://puranclothes.vercel.app/role?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRole(data)
                    setIsRoleLoading(false)
                })
        }
    }, [email])

    return [role, isRoleLoading]

};

export default useRole;